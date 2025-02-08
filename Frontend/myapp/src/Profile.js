
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css'; // Your custom styles
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const Profile = () => {
//     const navigate = useNavigate();
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));


//     const { hostler } = userDetails;
//     const [isEditingUser, setIsEditingUser] = useState(false);
//     const [isEditingAddress, setIsEditingAddress] = useState(false);
//     const [firstname, setFirstname] = useState(hostler.firstname);
//     const [lastname, setLastname] = useState(hostler.lastname);
//     const [email, setEmail] = useState(hostler.email);
//     const [phonenumber, setPhonenumber] = useState(hostler.phonenumber);
//     const [dateofbirth, setDateofbirth] = useState(hostler.dateofbirth);
//     const [area, setArea] = useState(hostler.address.area);
//     const [city, setCity] = useState(hostler.address.city);
//     const [state, setState] = useState(hostler.address.state);
//     const [pinCode, setPinCode] = useState(hostler.address.pinCode);

//     if (!userDetails) {
//         return <div className="alert alert-warning text-center">No user data found. Please log in.</div>;
//     }
//     const handleCloseClick = () => navigate(-1);

//     const handleUserSave = () => {
//         console.log('User details updated');
//         const updatedUserDetails = {
//             ...userDetails,
//             hostler: {
//                 ...hostler,
//                 firstname,
//                 lastname,
//                 email,
//                 phonenumber,
//                 dateofbirth,
//             },
//         };
//         localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
//         setIsEditingUser(false);
//     };

//     const handleAddressSave = () => {
//         console.log('Address updated');
//         const updatedUserDetails = {
//             ...userDetails,
//             hostler: {
//                 ...hostler,
//                 address: { area, city, state, pinCode },
//             },
//         };
//         localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
//         setIsEditingAddress(false);
//     };

//     const toggleForm = (formType) => {
//         setIsEditingUser(formType === 'user');
//         setIsEditingAddress(formType === 'address');
//     };

//     const formattedAddress = `${hostler.address.area}, ${hostler.address.city}, ${hostler.address.state} - ${hostler.address.pinCode}`;

//     return (
//         <div className="container mt-5">
//             <button className="btn-close float-end" onClick={handleCloseClick}></button>
//             <h1 className="text-center mb-4">User Profile</h1>
//             <div className="d-flex justify-content-center align-items-center flex-row">
//                 {/* Profile Box */}
//                 <div className={`card p-4 profile-box ${isEditingUser || isEditingAddress ? 'move-left' : ''}`} style={{ width: '100%', maxWidth: '400px' }}>
//                     <img
//                         src="https://avatar.iran.liara.run/public/12"
//                         alt="Profile"
//                         className="rounded-circle mx-auto d-block mb-3"
//                         style={{ width: '100px', height: '100px' }}
//                     />
//                     <h2 className="text-center">{hostler.firstname} {hostler.lastname}</h2>
//                     <p>Email: {hostler.email}</p>
//                     <p>Phone Number: {hostler.phonenumber}</p>
//                     <p>Date of Birth: {hostler.dateofbirth}</p>
//                     <p>Address: {formattedAddress}</p>
//                     <div className="d-flex justify-content-around my-3">
//                         <button
//                             className="btn btn-primary"
//                             onClick={() => toggleForm('user')}
//                         >
//                             Edit User
//                         </button>
//                         <button
//                             className="btn btn-secondary"
//                             onClick={() => toggleForm('address')}
//                         >
//                             Edit Address
//                         </button>
//                     </div>
//                 </div>

//                 {/* Form Container */}
//                 <div className={`form-container ${isEditingUser || isEditingAddress ? 'show' : ''}`}>
//                     {isEditingUser && (
//                         <form className="bg-light p-4 mt-4 rounded shadow">
//                             <h3>Edit User Details</h3>
//                             <div className="mb-3">
//                                 <label htmlFor="firstname" className="form-label">First Name</label>
//                                 <input
//                                     type="text"
//                                     id="firstname"
//                                     className="form-control"
//                                     value={firstname}
//                                     onChange={(e) => setFirstname(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="lastname" className="form-label">Last Name</label>
//                                 <input
//                                     type="text"
//                                     id="lastname"
//                                     className="form-control"
//                                     value={lastname}
//                                     onChange={(e) => setLastname(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="form-control"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="phonenumber" className="form-label">Phone Number</label>
//                                 <input
//                                     type="tel"
//                                     id="phonenumber"
//                                     className="form-control"
//                                     value={phonenumber}
//                                     onChange={(e) => setPhonenumber(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="dateofbirth" className="form-label">Date of Birth</label>
//                                 <input
//                                     type="date"
//                                     id="dateofbirth"
//                                     className="form-control"
//                                     value={dateofbirth}
//                                     onChange={(e) => setDateofbirth(e.target.value)}
//                                 />
//                             </div>
//                             <button type="button" className="btn btn-success" onClick={handleUserSave}>Save</button>
//                         </form>
//                     )}

//                     {isEditingAddress && (
//                         <form className="bg-light p-4 mt-4 rounded shadow">
//                             <h3>Edit Address</h3>
//                             <div className="mb-3">
//                                 <label htmlFor="area" className="form-label">Area</label>
//                                 <input
//                                     type="text"
//                                     id="area"
//                                     className="form-control"
//                                     value={area}
//                                     onChange={(e) => setArea(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="city" className="form-label">City</label>
//                                 <input
//                                     type="text"
//                                     id="city"
//                                     className="form-control"
//                                     value={city}
//                                     onChange={(e) => setCity(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="state" className="form-label">State</label>
//                                 <input
//                                     type="text"
//                                     id="state"
//                                     className="form-control"
//                                     value={state}
//                                     onChange={(e) => setState(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="pinCode" className="form-label">Pin Code</label>
//                                 <input
//                                     type="text"
//                                     id="pinCode"
//                                     className="form-control"
//                                     value={pinCode}
//                                     onChange={(e) => setPinCode(e.target.value)}
//                                 />
//                             </div>
//                             <button type="button" className="btn btn-success" onClick={handleAddressSave}>Save</button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Your custom styles
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './userSlice';  // Adjust the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Initialize dispatch to send actions
    const userDetails = useSelector((state) => state.user.userDetails);  // Access userDetails from Redux store
    const hostler = userDetails ? userDetails.hostler : {};  // Get hostler details
    
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [firstname, setFirstname] = useState(hostler.firstname);
    const [lastname, setLastname] = useState(hostler.lastname);
    const [email, setEmail] = useState(hostler.email);
    const [phonenumber, setPhonenumber] = useState(hostler.phonenumber);
    const [dateofbirth, setDateofbirth] = useState(hostler.dateofbirth);
    const [area, setArea] = useState(hostler.address.area);
    const [city, setCity] = useState(hostler.address.city);
    const [state, setState] = useState(hostler.address.state);
    const [pinCode, setPinCode] = useState(hostler.address.pinCode);
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    if (!userDetails) {
        return <div className="alert alert-warning text-center">No user data found. Please log in.</div>;
    }
    const handleCloseClick = () => navigate(-1);

    const handleUserSave = async () => {
        console.log('User details updated');
        const updatedHostlerDetails = {
            hostlerid: userDetails.hostler.hostlerid, // Keep the hostler ID to identify the hostler to update
            firstname,
            lastname,
            email,
            phonenumber,
            dateofbirth,
        };
    
        // Send the updated hostler details to the server
        try {
            const response = await fetch('http://localhost:8080/api/updatehost', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedHostlerDetails), // Only sending the hostler details
            });
    
            if (response.ok) {
                console.log('User details updated on server');
                
                // If the user details are successfully updated on the server, update localStorage
                const updatedUserDetails = {
                    ...userDetails,
                    hostler: {
                        ...hostler,
                        firstname,
                        lastname,
                        email,
                        phonenumber,
                        dateofbirth,
                    },
                };
                dispatch(setUser({ userDetails: updatedUserDetails, userType: userDetails.role.roleName }));
    
                // Optionally show success message on screen
                setSuccessMessage('User details successfully updated!');
                setIsEditingUser(false);
            } else {
                console.error('Error updating user details on server');
                setSuccessMessage('Failed to update user details. Please try again later.'); // Set failure message
            }
        } catch (error) {
            console.error('Network error:', error);
            setSuccessMessage('Failed to update user details. Please try again later.'); // Set failure message
        }
    };

    const handleAddressSave = async () => {
        console.log('Address updated');
        const updatedAddress = {
            addressid: userDetails.hostler.address.addressid, // Keep the address ID to identify the address to update
            area,
            city,
            state,
            pinCode,
        };
    
        // Send the updated address to the server
        try {
            const response = await fetch('http://localhost:8080/api/updateAddress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAddress), // Only sending the address
            });
    
            if (response.ok) {
                console.log('Address updated on server');
                
                // If the address is successfully updated on the server, update localStorage
                const updatedUserDetails = {
                    ...userDetails,
                    hostler: {
                        ...hostler,
                        address: { area, city, state, pinCode }, // Update address locally as well
                    },
                };
                dispatch(setUser({ userDetails: updatedUserDetails, userType: userDetails.role.roleName }));
    
                // Optionally show success message on screen
                setSuccessMessage('Address successfully updated!');
                setIsEditingAddress(false);
            } else {
                console.error('Error updating address on server');
                setSuccessMessage('Failed to update address. Please try again later.'); // Set failure message
            }
        } catch (error) {
            console.error('Network error:', error);
            setSuccessMessage('Failed to update address. Please try again later.'); // Set failure message
        }
    };

    const toggleForm = (formType) => {
        setIsEditingUser(formType === 'user');
        setIsEditingAddress(formType === 'address');
    };

    const formattedAddress = `${hostler.address.area}, ${hostler.address.city}, ${hostler.address.state} - ${hostler.address.pinCode}`;

    return (
        <div className="container mt-5">
            <button className="btn-close float-end" onClick={handleCloseClick}></button>
            <h1 className="text-center mb-4">User Profile</h1>
            {successMessage && (
                <div className="alert alert-success text-center">
                    {successMessage}
                </div>
            )}
            <div className="d-flex justify-content-center align-items-center flex-row">
                {/* Profile Box */}
                <div className={`card bg-dark p-4 profile-box ${isEditingUser || isEditingAddress ? 'move-left' : ''}`} style={{ width: '100%', maxWidth: '400px' }}>
                    <img
                        src="https://avatar.iran.liara.run/public/12"
                        alt="Profile"
                        className="rounded-circle mx-auto d-block mb-3"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <h2 className="text-center">{hostler.firstname} {hostler.lastname}</h2>
                    <p>Email: {hostler.email}</p>
                    <p>Phone Number: {hostler.phonenumber}</p>
                    <p>Date of Birth: {hostler.dateofbirth}</p>
                    <p>Address: {formattedAddress}</p>
                    <div className="d-flex justify-content-around my-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => toggleForm('user')}
                        >
                            Edit User
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => toggleForm('address')}
                        >
                            Edit Address
                        </button>
                    </div>
                </div>

                {/* Form Container */}
                <div className={`form-container ${isEditingUser || isEditingAddress ? 'show' : ''}`}>
                    {isEditingUser && (
                        <form className="bg-dark p-4 mt-4 rounded shadow">
                            <h3>Edit User Details</h3>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    className="form-control"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    className="form-control"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phonenumber"
                                    className="form-control"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateofbirth" className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateofbirth"
                                    className="form-control"
                                    value={dateofbirth}
                                    onChange={(e) => setDateofbirth(e.target.value)}
                                />
                            </div>
                            <button type="button" className="btn btn-success" onClick={handleUserSave}>Save</button>
                        </form>
                    )}

                    {isEditingAddress && (
                        <form className="bg-dark p-4 mt-4 rounded shadow">
                            <h3>Edit Address</h3>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Area</label>
                                <input
                                    type="text"
                                    id="area"
                                    className="form-control"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pinCode" className="form-label">Pin Code</label>
                                <input
                                    type="text"
                                    id="pinCode"
                                    className="form-control"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </div>
                            <button type="button" className="btn btn-success" onClick={handleAddressSave}>Save</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
