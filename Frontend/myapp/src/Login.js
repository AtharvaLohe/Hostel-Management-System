// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setUser } from './userSlice'; // Adjusted import path

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:8080/api/check', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             // Check if response is successful
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(`Error: ${errorData.message || 'Invalid credentials'}`);
//             }

//             // Parse the user data returned from the backend
//             const userData = await response.json();
//             console.log('User Data:', userData);  // Log the full user data to check

//             // Check if role is being returned as expected
//             console.log('User Role:', userData.role ? userData.role.roleName : 'No role');

//             // Dispatch the user data to Redux
//             dispatch(setUser({
//                 userDetails: userData,
//                 userType: userData.role ? userData.role.roleName : 'guest',  // Assuming 'role' is an object with a 'roleName' field
//             }));

//             // Redirect based on user role
//             if (userData.role && userData.role.roleName === 'Admin') {
//                 console.log('Redirecting to Admin Dashboard');
//                 navigate('/admin');  // Navigating to '/admin' as per your route setup
//             } else {
//                 console.log('Redirecting to Hostler Dashboard');
//                 navigate('/hostler-dashboard');  // Navigating to '/hostler-dashboard' as per your route setup
//             }

//             setError('');
//         } catch (err) {
//             console.error('Error:', err);
//             setError('Login failed: ' + err.message);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center">Login</h2>
//             <form onSubmit={handleLogin} className="w-50 mx-auto">
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//                 {error && <p className="text-danger">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser   } from './userSlice'; // Adjust import path

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleForget = () => {
        navigate('/forgetPassword')
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8160/auth/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Check if response is successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || 'Invalid credentials'}`);
            }

            // Parse the user data returned from the backend
            const userData = await response.json();
            console.log('User   Data:', userData);  // Log the full user data to check

         

            // Dispatch the user data to Redux
            dispatch(setUser  ({
                userDetails: userData,
                userType: userData.role ? userData.role.roleName : 'guest',  // Assuming 'role' is an object with a 'roleName' field
            }));

           
            
            // Redirect based on user role (existing feature)
            if (userData.role && userData.role.roleName === 'Admin') {
                console.log('Redirecting to Admin Dashboard');
                navigate('/admin');  // Navigating to '/admin' as per your route setup
            }else if (userData.role && userData.role.roleName === 'Owner') {
                console.log('Redirecting to Owner Dashboard');
                navigate('/owner');
            }
            // else {
            //     console.log('Redirecting to Hostler Dashboard');
            //     navigate('/hostler-dashboard');  // Navigating to '/hostler-dashboard' as per your route setup
            // }

            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('Login failed: ' + err.message);
        }
    };

    return (
        <div className="container mt-5 content-wrapper">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin} className="w-50 mx-auto">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
                <button type="button" className="btn" onClick={handleForget}>Forget Password</button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
};

export default Login;