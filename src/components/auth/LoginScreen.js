import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    // useSelector para traer el estado de loagin
    const {loading} = useSelector( state => state.ui);

    // uso mi hook personalizado useform y le paso valore siniciales
    const [ formValues, handleInputChange] = useForm({
        email: 'jose@gmail.com',
        password: '123456'
    });

    // Destructuración de formValues
    const {email, password} = formValues;

    // función que se ejecuta cuando hacemos submit del formulario
    const handleLogin = (e) => {
        e.preventDefault();

        // dispatch a la función que se encarga de comprobar en firebase si es correcto el email y el password
        dispatch( startLoginEmailPassword(email, password));
    }

    // función cuando se ejecuta el click en el boton de login de gooogle
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn anime__faster"
            >
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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>        
                
                <div className="auth__social_networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
