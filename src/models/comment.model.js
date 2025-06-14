// 🗂️ Bringing in mongoose, the tool that helps us talk to MongoDB like a pro.
import mongoose from "mongoose";

// 🧱 Now we start building the blueprint (schema) for a "comment" — like a form you fill before making a post.
const commentSchema = new mongoose.Schema({

  // 🆔 This tells us which video this comment belongs to.
  // We're using ObjectId to connect (link) this comment to the "Video" model in another file.
  videoId: {
    type: mongoose.Schema.Types.ObjectId, // ➡️ This is like a unique code for each video.
    ref: "Video", // 🔗 This tells Mongoose, “Hey, this ID comes from the Video collection.”
    required: true, // 🚨 Means you *must* give a videoId when saving a comment, or it’ll throw an error.
  },

  // 👤 This stores the user who wrote the comment.
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ➡️ Unique code for the user who wrote this comment.
    ref: "newUser", // 🔗 Connects this comment to the “newUser” model.
    required: true, // ❗ You can’t save a comment without knowing who wrote it.
  },

  // 💬 This is the actual comment text — what the person typed.
  text: {
    type: String, // 📝 It’s just plain text like “Nice video!” or “Awesome content!”
    required: true, // 📌 No empty comments allowed; it must contain some words.
  },

  // ⏰ This keeps track of *when* the comment was made.
  timestamp: {
    type: Date, // 📅 This means it's a date-time value.
    default: Date.now, // ⏳ If no date is given, it uses the current time by default.
  },
});

// 🏷️ Now we turn the blueprint into a real thing (a model) called "Comment" that we can use to save and fetch data from MongoDB.
export const Comment = mongoose.model("Comment", commentSchema);
