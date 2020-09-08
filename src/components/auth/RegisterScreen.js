import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    // obtengo el estado de msgError que esta uiReducer
    const {msgError} = useSelector( state => state.ui);

    // uso mi hook personalizado de formulario
    const [ formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // detructuración de los valores formValues
    const {name, email, password, password2} = formValues;

    // función que se ejecuta cuando se hace submit del formulario regitro
    const handleRegister = (e) => {
        e.preventDefault();

        // compruebra la validación del formulario
        if( isFormValid()){
            dispatch( startRegisterWithEmailPasswordName(email, password, name))
        }

    }

    // función para validar el formulario
    const isFormValid = () => {
        if(name.trim().length === 0){
            // dispatch para en el uiReducer poner el estado del error
            dispatch(setError('Name is required'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false;
        }else if(password !== password2 || password.length < 5){
            dispatch(setError('Password should be at least 6 characteres and match each other'));
            return false
        }
        // dispatch para en le uiReducer remover los error del estado 
        dispatch(removeError());
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn anime__faster"
            >
                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }           

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already register?
                </Link>

            </form>
    </>
    )
}
