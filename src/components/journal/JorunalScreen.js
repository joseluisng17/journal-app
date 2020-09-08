import React from 'react'
import { Sidebar } from './Sidebar'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected'

export const JorunalScreen = () => {

    // useSelector para tomar el stado de las notas desctucturamos para tomar el atributo o llave active con su valor
    const {active} = useSelector( state => state.notes);

    return (
        <div className="journal__main-content animate__animated animate__fadeIn anime__faster">
            <Sidebar/>

            <main>

                {
                    (active)
                        ? ( <NoteScreen/> )
                        : ( <NothingSelected /> )
                }
               
            </main>
        </div>
    )
}
