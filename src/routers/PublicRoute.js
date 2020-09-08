import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ isLoggedIn, component: Component, ...rest}) => {
    return (
        <div>
            <Route {...rest}
                component={ (props) => (
                    ( isLoggedIn )
                        ? ( <Redirect to="/"/> )
                        : ( <Component { ...props}/> )
                )}
            />
        </div>
    )
}

PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

