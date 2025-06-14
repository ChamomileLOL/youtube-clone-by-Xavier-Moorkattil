// 📁 controllers/account.controller.js

// Bring in the user model to talk to our "users" database table
import { newUser } from "../models/account.model.js";

// Also bring in the Video model, used later for watch history
import { Video } from "../models/video.model.js";

// This is a special wrapper that catches async errors like a safety net
import { asyncHandler } from "../utils/asyncHandler.js";

// Standard format to send successful responses back
import { ApiResponse } from "../utils/ApiResponse.js";

// Format used when something goes wrong (errors)
import { ApiError } from "../utils/ApiError.js";

// Tool to upload files (like profile pictures) to Cloudinary
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Tool to handle JWT tokens (used for login sessions)
import jwt from "jsonwebtoken";

// Mongoose helps us talk to MongoDB
import mongoose from "mongoose";


// 🎯 Helper Function to make new tokens for a user
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Find the user in DB using their ID
        const user = await newUser.findById(userId);

        // Ask user model to create a fresh access token
        const accessToken = user.generateAccessToken();

        // And also a refresh token (used to get a new access token later)
        const refreshToken = user.generateRefreshToken();

        // Save that refresh token in DB so we can verify it later
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // save quickly without re-checking fields

        // Send both tokens back
        return { accessToken, refreshToken };
    } catch (error) {
        // If anything broke, send a 500 error
        throw new ApiError(500, "Token generation failed");
    }
};


// 👤 User Registration
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // If anything is missing, we stop right away
    if (!name || !email || !password) {
        throw new ApiError(400, "Name, email, and password are required");
    }

    // Check if someone already has that name or email
    const existingUser = await newUser.findOne({
        $or: [{ name }, { email }]
    });

    // If yes, we don’t allow registration
    if (existingUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    // If no avatar given, use this default one
    const defaultAvatar = "https://res.cloudinary.com/drr9bsrar/image/upload/v1716498256/egt2sufg3qzyn1ofws9t.jpg";

    // Make the user in DB with the provided details
    const user = await newUser.create({
        name,
        email,
        password,
        avatar: defaultAvatar
    });

    // Tell the frontend it worked!
    return res.status(201).json(new ApiResponse(201, user, "Registration successful"));
});


// 🔐 User Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are both filled
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Look for user by email
    const user = await newUser.findOne({ email });

    // If not found, say “user not found”
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if password is correct
    const isValidPassword = await user.isPasswordCorrect(password);

    // If password wrong, throw error
    if (!isValidPassword) {
        throw new ApiError(400, "Incorrect password");
    }

    // If everything good, generate new tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Don’t show refreshToken to frontend
    const safeUser = await newUser.findById(user._id).select("-refreshToken");

    // Cookie setup: secure (HTTPS) and hidden from JS (httpOnly)
    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    // Finally, send cookies + response
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: safeUser, accessToken, refreshToken }, "Login successful"));
});


// 🚪 User Logout
const logoutUser = asyncHandler(async (req, res) => {
    // Remove refreshToken from DB so it can’t be reused
    await newUser.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" }
    });

    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    // Clear cookies and confirm logout
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logout successful"));
});


// ♻️ Refresh Token (get new access token)
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Try to get refresh token from cookies or request body
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Missing refresh token");
    }

    try {
        // Verify the refresh token with JWT secret
        const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

        // Get user based on decoded token data
        const user = await newUser.findById(decoded?._id);

        // If user not found or token mismatch, error
        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        // Create new tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Token refreshed"));
    } catch {
        throw new ApiError(401, "Refresh token error");
    }
});


// 🛠️ Update User Details
const updateAccount = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    let avatarUrl;

    // If a new avatar file is given, upload to Cloudinary
    if (req.file) {
        const uploaded = await uploadOnCloudinary(req.file.path);
        avatarUrl = uploaded?.url;
    }

    // Build update object
    const updateData = { name, email, password };
    if (avatarUrl) updateData.avatar = avatarUrl;

    // Update user in DB
    const updatedUser = await newUser.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
    );

    // Return updated user
    return res.status(200).json(new ApiResponse(200, updatedUser, "Account updated"));
});


// ❌ Delete Account
const deleteAccount = asyncHandler(async (req, res) => {
    const deleted = await newUser.findByIdAndDelete(req.params.id);

    if (!deleted) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Account deleted"));
});


// 🔎 Get User Info by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await newUser.findById(req.params.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User retrieved"));
});


// 🎞️ Fetch Watch History with full video and owner info
const GetWatchHistory = asyncHandler(async (req, res) => {
    const userHistory = await newUser.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "newusers",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: { $first: "$owner" }
                        }
                    }
                ]
            }
        }
    ]);

    // Return only the watchHistory from user
    return res.status(200).json(new ApiResponse(200, userHistory[0].watchHistory, "Watch history loaded"));
});


// ➕ Add Video to Watch History
const addToWatchHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const videoId = req.params.id;

    // Validate if the videoId is legit
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Get user from DB
    const user = await newUser.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // If this video not already in watch history, add it
    if (!user.watchHistory.includes(videoId)) {
        user.watchHistory.push(videoId);
        await user.save();
    }

    return res.status(200).json(new ApiResponse(200, user.watchHistory, "Video added to watch history"));
});


// 🚚 Export all these functions for use in routes
export {
    registerUser,
    login,
    logoutUser,
    refreshAccessToken,
    updateAccount,
    deleteAccount,
    getUserById,
    GetWatchHistory,
    addToWatchHistory
};
