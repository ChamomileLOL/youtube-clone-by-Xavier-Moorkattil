// 🍜 Bring in the Router tool from Express to create a mini route-handling machine
import { Router } from "express";

// 🧠 Import all the important actions related to accounts from the controller file
import { 
    deleteAccount,            // For removing a user
    registerUser,             // For signing up
    login,                    // For logging in
    updateAccount,            // For updating profile details
    logoutUser,               // For logging out
    refreshAccessToken,       // For getting a new token when the old one expires
    getUserById,              // For getting info of a specific user
    GetWatchHistory,          // For getting the watch history of a user
    addToWatchHistory         // For adding a video to the watch history
} from "../controllers/account.controller.js";

// 📦 Bringing in a tool that helps us upload files, like a user avatar (image)
import { upload } from "../middlewares/multer.middleware.js";

// 🔐 Bringing in our bodyguard – checks if user has a valid token (JWT) before letting them in
import { verifyJWT } from "../middlewares/auth.middleware.js";

// 🛠️ Create a fresh router object to start defining routes
const router = Router();

// 🚪 Signup route: when someone fills the signup form, this is where it lands
// Method: POST => We are sending data to create a new user
router.route("/signup").post(registerUser);

// 🔐 Login route: user sends email & password to log in
router.route("/login").post(login);

// 🧹 Logout route: needs valid token to log the user out (like closing the session)
router.route("/logout").post(verifyJWT, logoutUser);

// 🔁 Refresh token: When the access token gets old, this gives a new one (without login again)
router.route("/refreshtoken").post(refreshAccessToken);

// ❌ Delete account route: deletes user by ID passed in the URL
// Method: DELETE => Removes the account
router.route("/delete/:id").delete(deleteAccount);

// 🧽 Update profile route: user sends updated data + optional avatar image
// Uses PUT because we're modifying an existing user, not creating a new one
// Also uses multer middleware to process the image file before updating
router.route("/update/:id").put(upload.single("avatar"), updateAccount);

// 🔍 Get user data by ID – useful for showing profile or dashboard data
router.route("/userData/:id").get(getUserById);

// 🎥 Watch history – returns what the logged-in user has watched
// Needs a token to confirm identity
router.route("/history").get(verifyJWT, GetWatchHistory);

// ➕ Add video to watch history – triggered when a user watches something
// Again, token needed to confirm who is doing it
router.route("/addToHistory/:id").put(verifyJWT, addToWatchHistory);

// 📦 Send this whole router package to other files so it can be used in the main server
export default router;
