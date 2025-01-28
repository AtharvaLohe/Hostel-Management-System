import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css'; // Ensure this path is correct
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Component Imports
import Header from './Header';
import Login from './Login';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import Amenities from './Amenities';
import AdminDashboard from './AdminDashboard';
import HostlerDashboard from './HostlerDashboard';
import LandingPage from './LandingPage';
import RegistrationForm from './Registration';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Profile from './Profile';
import RoomAllocation from './RoomAllocation';
import FoodMealManager from './AdminMeal';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <Header />
                <div className="container">
                    <Routes>
                        {/* Redirect from root to admin */}
                       
                        
                        {/* Public Routes */}
                        <Route path='/' element={<LandingPage />} />
                        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                        <Route path='/register' element={<RegistrationForm/>}/>
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/amenities" element={<Amenities />} />

                        {/* Protected Routes */}
                        
                        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                        <Route path="/meal" element={<FoodMealManager/>}/>
                        <Route path="/hostler-dashboard" element={<PrivateRoute><HostlerDashboard /></PrivateRoute>} />
                        <Route path="/hostelerprofile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                        <Route path="/roomallocate" element={<PrivateRoute><RoomAllocation/></PrivateRoute>} />
                        {/* Fallback Route */}

                        <Route path="*" element={<h2>404 Not Found</h2>} />
                        </Routes>
                        
                </div>
            </div>
        </Provider>
    );
};

export default App;
