// Let's define a function named asyncHandler.
// This function is a kind of "bodyguard" for any route handler we write in Express.
// Its job is to catch errors that happen inside async functions and send them to the error handler.
const asyncHandler = (requestHandler) => {

    // Now, we return a new function.
    // This new function takes in the usual Express request (req), response (res), and next (next) objects.
    // Think of them like passengers on a bus: 'req' is the message from the user, 'res' is the reply we want to send back, and 'next' is what moves us to the next stop (or handler) if needed.
    return (req, res, next) => {

        // Here's the key move:
        // We take the function that was passed into asyncHandler (we called it requestHandler),
        // and we run it using the current req, res, and next.

        // BUT: because that function might be 'async' and return a Promise,
        // we wrap it with Promise.resolve() just to make sure we’re handling it as a proper promise.
        // Then, we attach a .catch() to catch any error it throws and pass that error to next().
        // This way, Express knows an error happened, and will use the central error-handling middleware.
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };

    // Summary: This wrapper is like a safety net for our routes.
    // If something breaks inside an async function, we don’t want the app to crash.
    // Instead, we catch the error and hand it over to Express’s error handler.
};

// We export asyncHandler so that it can be used in other files.
// For example, to wrap controllers or route functions in Express apps.
export { asyncHandler };
