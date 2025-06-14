// 🧭 Step 1: We are bringing in the Router from Express.
// Think of 'Router' like a traffic controller that helps decide which path a request should follow.
import { Router } from "express";

// 🧳 Step 2: We are importing the three main functions (like tools in our toolbox)
// These functions are responsible for adding, showing, and deleting comments.
import {
  addComment,         // 👉 This helps us add a new comment to a video.
  getCommentsByVideo, // 👉 This helps us fetch (read) all comments under a specific video.
  deleteComment       // 👉 This helps us remove a comment by its ID.
} from "../controllers/comment.controller.js";

// 🛡️ Step 3: We are importing a security gatekeeper (middleware) called verifyJWT.
// It checks if the person making the request has a valid login token.
import { verifyJWT } from "../middlewares/auth.middleware.js";

// 🚪 Step 4: We now create a door (router) to define all comment-related paths.
const router = Router();

// 🔒 Step 5: Before letting anyone in, we install the gatekeeper for ALL comment routes.
// This means: If you're not logged in properly (don’t have a JWT token), you can’t use these routes.
router.use(verifyJWT);

// 📝 Step 6: If someone wants to ADD a comment, they go to /add with a POST request.
// Example: POST /api/comment/add
router.post("/add", addComment);

// 🔍 Step 7: If someone wants to SEE all comments under a specific video,
// they use a GET request and provide the video ID in the URL.
// Example: GET /api/comment/abc123
router.get("/:videoId", getCommentsByVideo);

// ❌ Step 8: If someone wants to DELETE a comment,
// they send a DELETE request with the comment’s ID.
// Example: DELETE /api/comment/xyz789
router.delete("/:id", deleteComment);

// 📤 Step 9: We send out our router so it can be used in the main server file.
// Like saying, “Hey main app, here’s the comment router I prepared.”
export default router;
