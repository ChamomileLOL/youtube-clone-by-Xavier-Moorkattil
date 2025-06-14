// Bringing in the heavy hitters (tools we'll need for this case)
import { Video } from "../models/video.model.js"; // This is our video database model - the warehouse of all video info.
import { asyncHandler } from "../utils/asyncHandler.js"; // A shield to catch errors in async functions.
import { ApiResponse } from "../utils/ApiResponse.js"; // A nice wrapper to give clean and uniform responses to the client.
import { ApiError } from "../utils/ApiError.js"; // A special tool to throw error messages in style.
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // The gateway to uploading files to the Cloud (Cloudinary).

// 🎬 Publish a new video
export const publishAVideo = asyncHandler(async (req, res) => {
  // Pulling out video info and files from the request
  const { title, description } = req.body; // The title and description of the video
  const thumbnailFile = req.files?.thumbnail?.[0]; // Optional chaining: grabbing the thumbnail file (if uploaded)
  const videoFile = req.files?.videoFile?.[0]; // Grabbing the actual video file (if uploaded)

  // Making sure no field is left empty
  if (!title || !description || !thumbnailFile || !videoFile) {
    // If anything is missing, raise a red flag
    throw new ApiError(400, "All fields (title, description, thumbnail, video file) are required");
  }

  // Sending the thumbnail to Cloudinary and waiting for confirmation
  const thumbnailUpload = await uploadOnCloudinary(thumbnailFile.path);
  // Now sending the video file
  const videoUpload = await uploadOnCloudinary(videoFile.path);

  // If either upload failed, we abort the mission
  if (!thumbnailUpload || !videoUpload) {
    throw new ApiError(400, "File upload to Cloudinary failed");
  }

  // Creating a new video entry in the database
  const newVideo = await Video.create({
    title, // Save title
    description, // Save description
    thumbnail: thumbnailUpload.url, // Save the Cloudinary URL of the thumbnail
    videoFile: videoUpload.url, // Save the Cloudinary URL of the video
    owner: req.user._id, // Who uploaded this? The logged-in user
    views: 0, // Start with zero views
  });

  // Send a success message back
  res.status(201).json(new ApiResponse(201, newVideo, "Video published successfully"));
});

// 📺 Get all videos
export const getAllVideos = asyncHandler(async (req, res) => {
  // Fetch every single video in the system
  const videos = await Video.find(); // No filter, just get everything
  // Return the list of videos with a happy message
  res.status(200).json(new ApiResponse(200, videos, "All videos fetched successfully"));
});

// 📺 Get videos uploaded by a specific user
export const getAllUserVideos = asyncHandler(async (req, res) => {
  const { owner } = req.params; // Grab the user's ID from the URL

  // If no ID, we can't move forward
  if (!owner) throw new ApiError(400, "Owner ID is required");

  // Find videos that belong to this owner
  const videos = await Video.find({ owner });

  // If that user hasn't uploaded anything
  if (!videos.length) {
    return res.status(404).json(new ApiResponse(404, [], "No videos found for this user"));
  }

  // If we got results, send them back
  res.status(200).json(new ApiResponse(200, videos, "User's videos fetched successfully"));
});

// ❌ Delete a video by ID
export const deleteVideoById = asyncHandler(async (req, res) => {
  const { id } = req.params; // The ID of the video to delete
  const userId = req.user._id; // The ID of the logged-in user trying to delete

  // First, we check if the video even exists
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // If the person trying to delete isn't the owner of the video, deny the action
  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to delete this video");
  }

  // If everything checks out, delete the video
  await Video.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Video deleted successfully"));
});

// 📹 Get a specific video by ID
export const VideoDataById = asyncHandler(async (req, res) => {
  const { id } = req.params; // ID of the video we want details about
  const video = await Video.findById(id); // Search for it in the database

  // If it's not found, let them know
  if (!video) throw new ApiError(404, "Video not found");

  // Otherwise, send it back to the user
  res.status(200).json(new ApiResponse(200, video, "Video details fetched"));
});

// 📈 Increment view count
export const viewsIncrement = asyncHandler(async (req, res) => {
  const { id } = req.params; // Which video was watched?

  const video = await Video.findById(id); // Fetch the video from the DB

  // If it's not there, say so
  if (!video) throw new ApiError(404, "Video not found");

  // If found, bump up the view count
  await video.incrementViews();

  // Respond back with the updated video
  res.status(200).json(new ApiResponse(200, video, "Video view count incremented"));
});

// 🔍 Search videos by title
export const searchVideos = asyncHandler(async (req, res) => {
  const { title } = req.query; // The keyword we are searching for

  // Use regex to search titles that match, case-insensitive
  const videos = await Video.find({ title: { $regex: title, $options: "i" } });

  // Send back the matched results
  res.status(200).json(new ApiResponse(200, videos, "Search results"));
});

// 🔖 Filter videos by category
export const filterVideosByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query; // Which category are we looking for?

  // Find videos that belong to that category
  const videos = await Video.find({ category });

  // Return the filtered results
  res.status(200).json(new ApiResponse(200, videos, "Videos filtered by category"));
});
