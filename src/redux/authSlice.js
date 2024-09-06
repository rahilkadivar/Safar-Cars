import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticate: false,
        userId: null
    },
    reducers: {
        login: (state) => { state.isAuthenticate = true },
        logout: (state) => {
            state.isAuthenticate = false;
            state.userId = null;
        },
        setUserId: (state, action) => { state.userId = action.payload }
    },
});

export const { login, logout, setUserId } = authSlice.actions;
export default authSlice.reducer;
