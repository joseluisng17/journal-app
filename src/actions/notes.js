import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
    return async(dispatch, getState) => {

        // el getState nos da el estado que tiene el componente, dicho componente que manda llamar esta función, componente Sidebar
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // hacemos una petición a firebase para guardar la nota en firebase
        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);

        // dispatch para seleccionar la nota en el estado notasReducer
        dispatch( activeNote( doc.id, newNote ));
        // dispatch para agregar la nota en el estado de notasReducer
        dispatch( addNewNote( doc.id, newNote ));
    }
}

// seleccionamos la nota que estamos trabajando mandando al notesReducer el payload un id y los valores de la nota y el type para que entre en el case correspondiente.
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

// mandamos al noteRecuer el id y la nota para guardarla en el estado y con su recpectivo type para que entre al case correspondiente.
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        // Mando llamar funcion que esta en el archivo helper que hace una petición get de notas a firebase
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

// función para mandar al notesReducer las notas
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

// función que guarda una nota con sus nuevos valores en la db firebase y en el estado el notesReducer
export const startSaveNote = (note) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        // se hace comprobación de notas url si no tiene valor entonces borramos el atributo o la llave url
        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = {...note };
        delete noteToFirestore.id;

        // hacemos una petición a la db de firebase para guardar la nota con sus nuevos valores
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        // haccemos un dispatch para que en notesReducer actualize el estado de la nota con los nuevos valores
        dispatch(refreshNote(note.id, note));
        // muestra un alert dialog con el mensaje de completado
        Swal.fire('Saved', note.title, 'success');

    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

// función para guardar un archivo 
export const startUploading = (file) => {
    return async(dispatch, getState) => {

        // obtenemos el estado que tiene el componente que mando llamar esta función
        const { active:activeNote } = getState().notes;

        // mostramos un alert dialog de que esta cargando el proceso de guardar el archivo
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });   

        // hacemos una petición asyncrona para guardar el archivo con la función fileUpload dicha función esta en le archivo helpers y ahí hace su logica.
        // dicha función guarda el archivo en cloudinary y retorna el url para visualizar la imagen.
        const fileUrl = await fileUpload(file);
        // a la nota activa a su llave o atributo url le pasamos el valor que retorno la función fileUpload 
        activeNote.url = fileUrl;
        // se hace dispatch para guardar los nuevos valores de la nota en firebase y en el estado del notesReducer
        dispatch( startSaveNote(activeNote));
        // cerramos el mensaje del aler dialog.
        Swal.close();

    }
}

// función que borra la nota del db.firebase y del estado de notesReducer
export const startDeleting = (id) => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;
        //petición a firebase para eliminar la nota de la db de firebase
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        // dispatch para borrar la nota del estado de notesReducer
        dispatch(deleteNote(id));

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
});