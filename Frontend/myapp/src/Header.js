
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from './userSlice'; // Adjust path for your userSlice

const Header = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    const isAuthenticated = !!userDetails; // Check if user is authenticated
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRestrictedUser = userDetails?.role?.roleName === "Admin" || userDetails?.role?.roleName === "Owner";

    // Logout handler
    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        localStorage.removeItem('userDetails'); // Clear user details from LocalStorage
        setUser(null);
        navigate('/login'); // Redirect to the login page
    };

    // Navigate to profile handler
    const handleProfileClick = () => {
        navigate('/hostelerprofile');
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar shadow fixed-top">


            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Skyline Stay</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/faq">FAQ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/amenities">Amenities</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">Welcome, {userDetails.username}!</span>
                                    <img
                                        src="https://avatar.iran.liara.run/public/12" // Dummy profile photo
                                         alt="Profile"
                                        className="rounded-circle"
                                         onClick={!isRestrictedUser ? handleProfileClick : undefined} // Disable click for Admin & Owner
                                        style={{ 
                                                width: 40, 
                                                height: 40, 
                                         cursor: isRestrictedUser ? 'default' : 'pointer' // Remove pointer cursor for Admin & Owner
                                        }}  
                                    />
                                </div>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;