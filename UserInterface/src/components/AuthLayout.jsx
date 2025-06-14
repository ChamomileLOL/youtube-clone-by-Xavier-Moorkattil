// We're bringing in React because we need to use its features, like components and hooks.
import React from 'react';

// We pull in useSelector from Redux to check if the user is logged in or not (auth status).
import { useSelector } from 'react-redux';

// useNavigate helps us redirect the user to a different page, like kicking out someone who doesn't belong.
import { useNavigate } from 'react-router-dom';

// This function is like a security guard at the gate.
// It wraps around certain pages and checks if you're allowed to enter.
function AuthLayout({ children }) {
    // We’re checking the current login status from our Redux state (is the user logged in or not?).
    const authStatus = useSelector((state) => state.auth.status);

    // This gives us the power to move the user to another page—like redirecting them home if they’re not allowed here.
    const navigate = useNavigate();

    // This effect runs when the component shows up on screen.
    // If the user is *not* logged in (authStatus is false), we send them back to the homepage.
    React.useEffect(() => {
        if (authStatus === false) {
            // The user is not supposed to be here, so we push them back to "/"
            navigate("/");
        }
    }, [authStatus, navigate]); // We’re watching for changes in authStatus or navigate to rerun this check.

    // If the user is logged in (authStatus is true), then we allow them to see the protected content.
    // Otherwise, we don’t show them anything. Like keeping the door shut until we know it’s safe.
    return (
        <>
            {authStatus === true ? children : null}
        </>
    );
}

// We send this AuthLayout function out so it can be used wherever needed in our app.
export default AuthLayout;
