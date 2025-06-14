// First, we're pulling in the tool called 'mongoose' to help us talk to our MongoDB database.
import mongoose, { Schema } from "mongoose";

// Imagine we're designing a form to record when someone likes something.
// That 'something' could be a video, a comment, or a tweet.
// But right now, we're focusing only on videos.

const likeSchema = new Schema(
  {
    // This is the ID of the video that got the like.
    // Think of it like writing down the license plate of the car you just gave a thumbs up to.
    video: {
      type: Schema.Types.ObjectId,  // We're storing just the unique ID of the video.
      ref: "Video"                  // And this ID connects to the 'Video' collection, like a hyperlink.
    },

    /*
    // 🚫 These parts are commented out for now.
    // If we ever want to allow likes on comments or tweets, we can come back and use these fields.

    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    },

    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet"
    },
    */

    // Here's the ID of the user who did the liking.
    // It's like writing down who gave the thumbs up.
    likedBy: {
      type: Schema.Types.ObjectId,  // Again, just their unique ID.
      ref: "User"                   // Which points to the 'User' collection (our people directory).
    }
  },
  {
    // This tells MongoDB to automatically track when the like was created or updated.
    // Like putting a date and time stamp on each thumbs up.
    timestamps: true
  }
);

// Finally, we wrap up the form and register it with the system.
// 'Like' is the label we'll use whenever we want to add or find likes in our database.
export const Like = mongoose.model("Like", likeSchema);
