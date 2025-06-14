// We are importing a special tool called 'cloudinary' to help us upload files (like images or videos) to the internet cloud
import { v2 as cloudinary } from "cloudinary";

// We are also using 'fs' which helps us read/write/delete files on our local computer
import fs from "fs";

// This one is for reading secret keys stored in a .env file, like passwords, without showing them in public code
import dotenv from "dotenv";

// This command loads the .env file content into our app so we can use secret stuff like API keys safely
dotenv.config();

// This part sets up the Cloudinary service by giving it the secret keys we loaded from .env file
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,     // This is the name of your Cloudinary account
    api_key: process.env.CLOUDINARY_API_KEY,           // This is the ID that proves it's you
    api_secret: process.env.CLOUDINARY_API_SECRET      // This is the private password Cloudinary uses to trust you
});

// We're now creating a helper function that takes a file from your computer and uploads it to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // If there's no file given (i.e., localFilePath is empty or undefined), throw an error
        if (!localFilePath) {
            throw new Error("Local file path is required"); // This means: “Hey! Where’s the file? I need it.”
        }

        // Now we attempt to upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",         // "auto" tells Cloudinary to decide whether it’s an image, video, etc.
            media_metadata: true           // This asks Cloudinary to collect extra details about the file
        });

        // If the upload is successful, we remove the file from our local storage to clean up space
        fs.unlinkSync(localFilePath); // Think of this like throwing the file in the trash after uploading it

        // Finally, return the upload response which contains info like the file's URL
        return response;
    } catch (error) {
        // If something goes wrong, log the error message
        console.error("Error uploading file:", error.message); // Print the problem so we can see what happened

        // Before trying to delete the file, check if it still exists (to avoid crashing again)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Safely delete the file to avoid clutter
        }

        // Return a clear message saying what went wrong
        return { error: error.message };
    }
};

// We are making this function available to be used in other parts of the app
export { uploadOnCloudinary };
