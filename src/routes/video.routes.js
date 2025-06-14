// 📁 Importing 'Router' tool from express so we can create separate route paths for videos
import { Router } from "express";

// 📁 Importing all the video-related functions from our video controller file
import {
  publishAVideo,              // function to handle uploading and saving a video
  getAllVideos,               // function to get all videos from database
  getAllUserVideos,           // function to get videos uploaded by a particular user
  deleteVideoById,            // function to delete a video by its ID
  VideoDataById,              // function to fetch details of a specific video
  viewsIncrement,             // function to increase view count of a video
  searchVideos,               // function to search videos based on text
  filterVideosByCategory      // function to filter videos by their category (e.g., music, tech)
} from "../controllers/video.controller.js";

// 📁 Importing our file upload middleware to handle uploading of thumbnails and video files
import { upload } from "../middlewares/multer.middleware.js";

// 📁 Importing JWT middleware to verify if user is logged in
import { verifyJWT } from "../middlewares/auth.middleware.js";

// 🚪 Creating a router object from Express to define all the video-related routes
const router = Router();

// 🔒 This line makes sure: ALL routes below this line can be accessed only if the user has a valid token
router.use(verifyJWT);

// 🧳 Setting up how the upload should work:
// 1 thumbnail image and 1 video file are allowed
const videoUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },   // allow only 1 thumbnail file
  { name: "videoFile", maxCount: 1 }    // allow only 1 actual video file
]);

// 📌 ROUTE 1: Upload (publish) a new video
// The user must send the thumbnail + video file, and the info is handled by 'publishAVideo'
router.post("/publish", videoUpload, publishAVideo);

// 📌 ROUTE 2: Get all videos (public or platform-wide)
// Just shows every video stored in the database
router.get("/allVideo", getAllVideos);

// 📌 ROUTE 3: Get all videos by a specific user (based on their user ID)
// For example: /allUserVideo/64gfdg23234df — this fetches all videos that user uploaded
router.get("/allUserVideo/:owner", getAllUserVideos);

// 📌 ROUTE 4: Delete a video by its ID
// Used when a user or admin wants to remove a particular video
router.delete("/delete/:id", deleteVideoById);

// 📌 ROUTE 5: Get data/details of a single video by its ID
// Shows info like title, description, views, etc.
router.get("/videoData/:id", VideoDataById);

// 📌 ROUTE 6: Increase view count of a video (when someone watches it)
// Called when someone plays the video
router.put("/incrementView/:id", viewsIncrement);

// 🔍 ROUTE 7: Search for videos using keywords (like title or description)
// Example: /search?query=football — returns videos with football in the title/description
router.get("/search", searchVideos);

// 🏷️ ROUTE 8: Filter videos based on category
// Example: /filter?category=Music — shows only videos in the Music category
router.get("/filter", filterVideosByCategory);

// 📤 Finally, make the router available for use in other files
export default router;
