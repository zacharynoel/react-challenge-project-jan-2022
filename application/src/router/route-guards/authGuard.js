import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const AuthGuard = (props) => {
    const auth = useSelector((state) => state.auth);
    
    /**
     * If the user is authenticated, we want to return the child Route
     * components that are wrapped within this AuthGuard. Otherwise,
     * we want to redirect the user back to the login page.
     */
    return auth.token
        ? props.children
        : <Redirect to="/login" />
}

export default AuthGuard;