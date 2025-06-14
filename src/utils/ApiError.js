// We’re creating a special type of error called ApiError – for when things go wrong in our app
class ApiError extends Error {

    // This is the constructor. It's like the brain of the operation – it sets up the error details when we create a new error.
    constructor(
        statusCode,                     // The HTTP status code – like 404, 500 – tells us how bad the problem is
        message = "Something went wrong", // If no message is given, we use this default one
        errors = [],                    // Any extra info about what went wrong – like validation errors – goes here
        stack = ""                      // This is the technical breadcrumb trail showing where the error started
    ){

        // We pass the main message to the built-in Error class so it behaves like a normal error
        super(message)

        // Save the HTTP status code in this object so we can use it later in the response
        this.statusCode = statusCode

        // We set data to null because in an error, we don't send good data – just say something went wrong
        this.data = null

        // Save the message again in this object – it’s a bit repetitive, but useful when debugging
        this.message = message

        // Mark this error as a failure – success is false (obviously!)
        this.success = false;

        // Attach any extra error details – like a list of field errors – if available
        this.errors = errors

        // If a stack trace is provided, we use that (could be from somewhere else)
        if (stack) {
            this.stack = stack
        } else {
            // If no stack is provided, we create one from right here so we can trace where the issue began
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// We export the ApiError class so other parts of our app can use it when something breaks
export { ApiError }
