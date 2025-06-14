// 🕵️ Bringing in the custom-made "ApiError" tool to throw clean, meaningful errors
import { ApiError } from "../utils/ApiError.js";

// 🧠 This helper wraps async functions and catches any errors they throw
import { asyncHandler } from "../utils/asyncHandler.js";

// 🔐 Bringing in the tool that decodes and verifies JWTs (JSON Web Tokens)
import jwt from "jsonwebtoken";

// 👤 Importing the user model from the database to find users based on decoded token
import { newUser } from "../models/account.model.js";

// ✅ This function checks if the request has a valid JWT and attaches the verified user to the request
export const verifyJWT = asyncHandler(
  async (req, _, next) => {
    try {
      // 🍪 Checking if the request has a token from cookies OR the Authorization header
      // If from cookie, it looks like: req.cookies.accessToken
      // If from header, it looks like: "Bearer <token>", so we strip off the word "Bearer "
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      // 🛑 If no token is found, stop right here—someone’s trying to sneak in
      if (!token) {
        // Throw an error with status code 401 = "Unauthorized"
        throw new ApiError(401, "Unauthorized request");
      }

      // 🔍 Using the secret key to verify and decode the token
      // If it's tampered with, this will fail
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      // 🧬 Once we have the decoded token, use the ID inside it to find the real user
      // And while we're at it, don't return sensitive info like password or refresh token
      const user = await newUser
        .findById(decodedToken?._id)
        .select("-password -refreshToken");

      // 🕳️ If no user matches the ID, the token was probably forged or the user got deleted
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      // 📎 If the user exists, attach the user object to the request
      // so future steps (like routes) can use the verified user data
      req.user = user;

      // 🚦 Allow the request to move to the next middleware or route handler
      next();
    } catch (error) {
      // 💥 If anything explodes above, catch it here and throw a meaningful error
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
