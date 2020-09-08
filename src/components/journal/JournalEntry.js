import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

    // usamos la libreria de moment para formatear la fecha recibida
    const noteDate = moment(date);
    const dispatch = useDispatch();

    // función para cuando seleccionan un journal(la nota que esta en el sidebar)
    const handleEntryClick = () => {
        // dispatch al noteReducer para activar o seleccionar la nota correspondiente 
        dispatch(activeNote(id,{
            date, title, body, url
            })
        );
    }


    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn anime__faster"
            onClick={handleEntryClick}
        >

            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('ddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
            
        </div>
    )
}
