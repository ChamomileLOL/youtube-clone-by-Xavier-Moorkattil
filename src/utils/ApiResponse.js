// Think of this as a smart box that we send back to the client after doing some job (like saving data or fetching stuff).
// This box always carries four things: status (number), data (the info), a message (like "Job done!"), and a flag (true/false to say if it worked).

// Define a new class called ApiResponse - like creating a new blueprint for how our response box should look.
class ApiResponse {

    // This function runs whenever we make a new response box using this blueprint.
    // It needs 3 ingredients: statusCode (number), data (actual content), and message (a sentence like "Success").
    constructor(statusCode, data, message = "Success") {

        // Save the status code into the box. This is like a traffic light for computers:
        // 200 = all good, 404 = not found, 500 = server crashed, etc.
        this.statusCode = statusCode

        // Put the actual data inside the box. Could be anything — user info, video list, result of some calculation.
        this.data = data

        // Keep the message safe inside too. If nobody gives a message, we write "Success" by default.
        this.message = message

        // Here's the smart trick: if the status code is less than 400 (means no error), we say success is true.
        // Otherwise, if it’s 400 or more, we know something went wrong, so success becomes false.
        this.success = statusCode < 400
    }
}

// Share this blueprint with the rest of the app so that other files can also use this smart response box.
export { ApiResponse }
