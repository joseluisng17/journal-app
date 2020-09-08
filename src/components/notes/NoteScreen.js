import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    // seleccionamos del estado la nota seleccionada
    const {active:note} = useSelector(state => state.notes);
    // traemos nuestros hook personalisado useForm usardo para llenar formulario
    const [formValues, handleInputChange, reset] = useForm(note);
    // destructuramos los valores que tiene formValues
    const { body, title, id } = formValues;
    // mantenemos la referencia de nuestro id de las notas, es para cuando recargamos la pagina se mantena la refenrecia del id de las notas
    const activeId = useRef(note.id);

    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id
        }
        
    }, [note,reset])

    useEffect(() => {
        
        // se hace dispatch para poner en el estado de notesReducer la nota seleccionada
        dispatch( activeNote(formValues.id, { ...formValues }));
    
    }, [formValues, dispatch]);

    // función que se activa al dar click en el btn delete
    const handleDelete = () => {
        // dispatch para borrar la nota del db.firebase y del estado de notesReducer
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder="what happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) &&
                    (<div className="notes__image">
                        <img 
                            src={note.url} 
                            alt="imagen"
                        />
                    </div>)
                }

            </div>

            <div
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </div>
            
        </div>
    )
}
