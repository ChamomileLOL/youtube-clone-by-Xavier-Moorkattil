// 📁 controllers/comment.controller.js
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const addComment = asyncHandler(async (req, res) => {
  const { videoId, text } = req.body;
  if (!videoId || !text) throw new ApiError(400, "Video ID and comment text required");

  const comment = await Comment.create({
    videoId,
    userId: req.user._id,
    text,
  });
  res.status(201).json(new ApiResponse(201, comment, "Comment added"));
});

export const getCommentsByVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const comments = await Comment.find({ videoId }).populate("userId", "name avatar").sort({ timestamp: -1 });
  res.status(200).json(new ApiResponse(200, comments, "Comments fetched"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) throw new ApiError(404, "Comment not found");
  if (comment.userId.toString() !== req.user._id.toString()) throw new ApiError(403, "Unauthorized");

  await Comment.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Comment deleted"));
});
