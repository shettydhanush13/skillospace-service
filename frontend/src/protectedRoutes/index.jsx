import React from "react"
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ path, component }) => {
    const accessToken = localStorage.getItem("accessToken")
    return (
        !accessToken ? 
        <Redirect to='/register' />
        :
        <Route to={path} component={component}/>
    )
}

ProtectedRoute.propTypes = {
    path: PropTypes.string,
    component : PropTypes.any
};

export default ProtectedRoute