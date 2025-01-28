import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => !!state.user.userDetails);
    console.log('Is Logged In:', isLoggedIn); // Debugging line

    return isLoggedIn ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
