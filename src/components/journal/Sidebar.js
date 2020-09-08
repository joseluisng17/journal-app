import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    // useSelector para obtener del estado el nombre del usuario autenticado
    const {name} = useSelector( state => state.auth);

    // función que se ejecuta cuando se da click en el boton de logout
    const handleLogout = () => {
        // dispatch para deslogearte en firebase y entrar a los reducers auth y note y borrar los datos del estado.
        dispatch( startLogout() );
    }

    // funcín para agregar una nueva nota
    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>{name}</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >

                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />
            
        </aside>
    )
}
