import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        userType: null, // 'admin' or 'hostler'
    },
    reducers: {
        setUser: (state, action) => { // Correctly define the reducer function
            state.userDetails = action.payload.userDetails;
            state.userType = action.payload.userType; // Store user type
        },
        logout: (state) => {
            state.userDetails = null;
            state.userType = null;
        },
    },
});

// Exporting the actions
export const { setUser, logout } = userSlice.actions;
// Exporting the reducer
export default userSlice.reducer;
