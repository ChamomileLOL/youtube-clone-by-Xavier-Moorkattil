// =======================
// routes/comment.routes.js
// =======================

// Bringing in the 'Router' tool from Express.
// This tool lets us create mini route systems like a detective setting up his own neighborhood patrols.
import { Router } from "express";

// Calling in the main action guys — the ones who will *add*, *fetch*, and *delete* comments.
// These are the "functions" written elsewhere (in the controllers folder).
import {
  addComment,            // Function to handle adding a new comment
  getCommentsByVideo,    // Function to get all comments for a particular video
  deleteComment          // Function to remove a specific comment
} from "../controllers/comment.controller.js";

// This guy (middleware) checks if someone trying to talk (make a request) is really who they say they are.
// If you don’t have a valid ID (token), you don’t get in. Period.
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Create our little route handler — like setting up a local outpost to control comment traffic.
const router = Router();

// Apply a rule to *every* route below this line.
// Anyone making a request must be verified — like a security guard asking for ID before letting you in.
router.use(verifyJWT);

// If someone wants to add a comment, they better knock here — a POST request to "/add".
// This tells the system: "Hey, we’re adding new info to the system."
router.post("/add", addComment);

// If someone wants to *see* all the comments for a specific video, they come here.
// We listen for a GET request with a `videoId` — like asking for comments linked to a particular case file.
router.get("/:videoId", getCommentsByVideo);

// If someone wants to delete a comment, we let them — but only after proper ID check (handled above).
// They hit DELETE and provide the comment’s unique `id`. Like erasing a note from a bulletin board.
router.delete("/:id", deleteComment);

// After setting up all the routes, we export this setup.
// This is like handing over the patrol map to the main app, saying “Here’s how we’re handling comment business.”
export default router;
