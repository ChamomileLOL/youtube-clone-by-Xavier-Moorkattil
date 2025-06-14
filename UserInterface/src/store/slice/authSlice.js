// We're importing tools from Redux Toolkit to make our state management easier.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Axios helps us talk to the server (backend) like a walkie-talkie for sending and receiving messages.
import axios from 'axios';

// This is our initial/default state. Imagine it like a clean diary before anything is written in it.
const initialState = {
    user: null,              // No user is logged in yet, so it's empty.
    loading: false,          // We're not doing any background work (like fetching data) right now.
    error: null,             // No errors at the moment.
    accessToken: null,       // We don’t have a login token yet.
    refreshToken: null,      // No backup token either.
    status: false,           // This means the user is not logged in yet.
};

// Think of this like a messenger function. It sends the user's signup data to the backend.
export const register = createAsyncThunk('/api/v1/account/signup', async (userData, { rejectWithValue }) => {
    try {
        // Sends the user’s data to the signup endpoint.
        const response = await axios.post('/api/v1/account/signup', userData);
        // If successful, we return the data we get from the backend.
        return response.data.data;
    } catch (error) {
        // If something goes wrong, we catch the error and send back the error message.
        return rejectWithValue(error.response.data.message);
    }
});

// This one does the same thing as register, but for logging in.
export const login = createAsyncThunk('/api/v1/account/login', async (userData, { rejectWithValue }) => {
    try {
        // Sends login info (email/password) to the server.
        const response = await axios.post('/api/v1/account/login', userData);
        // If successful, we get the user info and tokens back.
        return response.data.data;
    } catch (error) {
        // If login fails, we send back the error message.
        return rejectWithValue(error.response.data.message);
    }
});

// This handles logout. It tells the server to log us out.
export const logout = createAsyncThunk('/api/v1/account/logout', async (_, { rejectWithValue }) => {
    try {
        // No data to send, just a signal to log out.
        await axios.post('/api/v1/account/logout');
        return true; // If it works, just return true.
    } catch (error) {
        // If it fails, send back the error message.
        return rejectWithValue(error.response.data.message);
    }
});

// This is the heart of the Redux part.
// It listens for what happened (register/login/logout) and updates the state accordingly.
const authSlice = createSlice({
    name: 'auth',           // Just giving a name to this slice of the state.
    initialState,           // This is the default setup from above.
    reducers: {},           // We don’t have normal reducers here, only special async ones.

    // Here we handle all the async actions: what to do while waiting, on success, and on failure.
    extraReducers: (builder) => {
        builder
            // When someone is trying to register, show loading, and clear any old error.
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // When registration is successful, save the user and their tokens.
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            // If registration fails, stop loading and show the error.
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Same 3 steps for login: pending, fulfilled, and rejected.
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // If login works, update all state values.
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true; // User is now logged in.
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            // If login fails, show the error.
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.status = false; // Stay logged out.
                state.error = action.payload;
            })

            // If logout works, mark the user as logged out, but keep other info unchanged.
            .addCase(logout.fulfilled, (state) => {
                return {
                    ...state,        // Keep everything else the same,
                    status: false    // Just change login status to false.
                };
            })
            // If logout fails, just save the error.
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// We export only the reducer (not the full slice) because that's what the Redux store needs.
export default authSlice.reducer;
