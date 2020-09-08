import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { JorunalScreen } from '../components/journal/JorunalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {

        firebase.auth().onAuthStateChanged( async(user) => {

            if(user?.uid){
                // hacemos dispatch para llegar al authReducer y llenar el state con uid y con un namge
                dispatch( login(user.uid, user.displayName));
                // ponermos la variable isLoggedIn a true para poder acceder a las rutas privadas
                setIsLoggedIn(true);
                // dispatch para llegar al notesReducer y llenar el stado con las notas del usuario.
                dispatch( startLoadingNotes(user.uid) );
                
            }else{
                // en caso de que no este autenticado la variable isLoggerIn permanece en false y no podemos acceder a las rutas privadas y permanecemos en las rutas publias.
                setIsLoggedIn(false);
            }

            setChecking(false);

        });
        
    }, [dispatch, setChecking, setIsLoggedIn ])

    if(checking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={AuthRouter} isLoggedIn={isLoggedIn}/>
                    <PrivateRoute exact path="/" component={JorunalScreen} isLoggedIn={isLoggedIn}/>

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
