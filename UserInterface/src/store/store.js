// Step 1: We are bringing in the special tool from Redux Toolkit to build our store.
// Think of this like getting a toolbox that helps us create a powerful "control room" (store).
import { configureStore } from '@reduxjs/toolkit';

// Step 2: We are importing our specific "authSlice" — this is like a recipe or module
// that knows how to deal with login, logout, and user identity stuff.
import authReducer from './slice/authSlice.js';

// Step 3: Now we are building the store.
// Imagine the store as a big brain that remembers and manages different parts of your app's state.
// Inside it, we install our "auth" logic, so it knows how to handle login/logout tasks.
const store = configureStore({
    // reducer is like a list of departments in our control room.
    // Each department (or key like 'auth') has its own job.
    reducer: {
        // We assign the "auth" department the logic written inside authReducer.
        // This means anything related to authentication (login, user details, etc.) will be managed here.
        auth: authReducer,
    },
});

// Step 4: We now export this store.
// This makes the store available to the rest of the app — like giving access to this control room to everyone.
// That way, all components can ask it questions or tell it to update something.
export default store;
