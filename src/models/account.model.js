// 🧠 We're bringing in tools. One is Mongoose to talk to MongoDB. The other is JSON Web Token (JWT) to create secure digital IDs.
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

// 📜 Think of this like the blueprint for a user. We’re telling MongoDB what each user should have.
const userSchema = new Schema(
  {
    // 👤 User must give a name. It must be unique (no duplicates), neat (no extra spaces), and easy to search (indexed).
    name: {
      type: String,       // It must be text.
      required: true,     // You cannot leave it empty.
      unique: true,       // No two users can have the same name.
      trim: true,         // Removes any spaces before/after the name.
      index: true         // Makes it faster to search by name.
    },
    // 📧 Email address must also be unique, cleaned up, and lowercase to avoid case sensitivity issues.
    email: {
      type: String,       // Must be text.
      required: true,     // Mandatory field.
      unique: true,       // No two users can share the same email.
      lowercase: true,    // Transforms to small letters.
      trim: true          // Removes unwanted spaces.
    },
    // 🔒 Password is required. Right now it's stored as-is, but ideally, it should be hashed before storing.
    password: {
      type: String,
      required: true
    },
    // 🖼️ Optional: This field stores the image link or path of the user's avatar.
    avatar: {
      type: String
    },
    // 📼 An array to keep track of all videos this user has watched. It holds video IDs only.
    watchHistory: [
      {
        type: Schema.Types.ObjectId,  // Each entry is an ID that points to a video.
        ref: "video"                  // Tells MongoDB this ID refers to something in the "video" collection.
      }
    ],
    // 🔁 This is used to issue a new access token without asking the user to log in again.
    refreshToken: {
      type: String
    }
  },
  {
    // ⏰ Automatically adds fields like "createdAt" and "updatedAt" to keep track of record history.
    timestamps: true
  }
);

// ✅ This method checks if the given password is correct.
// 🧪 Right now, it just compares raw passwords. But in a real app, you must use hashing (like bcrypt) for safety.
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return this.password === enteredPassword;
};

// 🔐 Creates a short-lived token (like a visitor pass) for secure user activity.
// 📬 It stores ID, email, and name inside the token so you know who it belongs to.
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,         // User’s unique MongoDB ID.
      email: this.email,     // Email for identity.
      name: this.name        // Name, just for display or greeting.
    },
    process.env.ACCESS_TOKEN_SECRET,     // Secret key to lock and unlock the token. Keep it hidden.
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // How long the token is valid. E.g., 15 minutes.
    }
  );
};

// 🔁 This one makes a longer-lasting token to keep the user logged in without retyping their password.
// ⚠️ It contains less info (only the user ID) and is refreshed when the short-lived token expires.
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id           // Only the ID is needed to refresh access.
    },
    process.env.REFRESH_TOKEN_SECRET,    // Another secret key, different from access one.
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY  // This lasts longer. E.g., 7 days.
    }
  );
};

// 📦 Now we tell MongoDB, “Here's our new model. Store users in a collection called ‘newUser’.”
export const newUser = mongoose.model("newUser", userSchema);
