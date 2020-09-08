import React from 'react'
import { startSaveNote, startUploading } from '../../actions/notes'
import { useDispatch, useSelector } from 'react-redux'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    // obtenemos del estado la nota seleccionada o la nota activa
    const {active} = useSelector(state => state.notes);

    // función para guardar una nota
    const handleSave = () => {
        // dispatch para guardar la nota con sus nuevos valores en db.firebase y en el estado del notesReducer.
        dispatch(startSaveNote(active));
    }

    // función para cuando dan click en el btn picture, muestra el input para agregar una imagen
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();

    }

    // función que se ejecuta cuando cargaron una archivo o imagen en el input de cargar imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if( file ){
            // dispatch para guardar la imagen en cloudinary, guardar el url de la imagen en db.firebase y en el estado del noteReducer.
            dispatch(startUploading(file));
        }

    }

    return (
        <div className="notes__appbar">
            <span>26 de agosto 2020</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
            
        </div>
    )
}
