import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { startLoading, finishLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        // dispatch para en el uiReducer poner el estado en loading = true
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                // dispatch para en el authReducer pasarle al estado el json con valor uid y displayname
                dispatch(
                        login(user.uid, user.displayName)
                    )
                    // dispatch para el uiReducer poner el estado loading = false
                dispatch(finishLoading());
            }).catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    // dispatch para en el authReducer pasarle al estado el json con valor uid y displayname
                    login(user.uid, user.displayName)
                )
            }).catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })

    }

}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                // dispatch para en el authReducer pasarle al estado el json con valor uid y displayname
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

// función para hacer singout en firebase
export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        // dispatch para llegar al authReducer y borrar del estado el uid y el displayname
        dispatch(logout());
        // dispatch para llegar al noteReducer y borrar las notas del estado
        dispatch(noteLogout());
    }
}

// manda la condición o el case al authReducer de logout
export const logout = () => ({
    type: types.logout
})