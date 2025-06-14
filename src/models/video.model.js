// 🧠 This file sets up a "Video" data model using Mongoose for MongoDB.
// 🛠️ It defines what details each video must have, like title, description, views, etc., and includes some built-in helpers like counting views automatically.

import mongoose, { Schema } from "mongoose"; // 🔌 Bring in Mongoose to talk to MongoDB. Schema is like a blueprint for how our data should look.

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 
// 📦 This plugin helps in paginating large chunks of video data – like breaking long lists into pages.

// 📄 Create the actual blueprint for each video entry.
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,       // 🎥 This is the path or URL of the video file.
            required: true      // ❗ Must be provided. No video file? No entry.
        },
        thumbnail: {
            type: String,       // 🖼️ This is the preview image for the video.
            required: true      // ❗ Can't skip this.
        },
        title: {
            type: String,       // 📝 Title of the video.
            required: true      // ❗ Every video needs a name.
        },
        description: {
            type: String,       // 📘 Short summary or explanation about the video.
            required: true      // ❗ Mandatory – helps users understand what the video is about.
        },
        duration: {
            type: Number,       // ⏱️ Length of the video in seconds (or minutes, depending on setup).
            default: 0          // 🟢 If nothing is given, assume it’s 0.
            // required: true   // ❌ Commented out – maybe it's optional at first, or calculated later.
        },
        views: {
            type: Number,       // 👀 How many people watched this video.
            default: 0          // 🟢 Starts at zero, like a newborn baby’s follower count.
        },
        owner: {
            type: Schema.Types.ObjectId, // 🆔 Link to the user who uploaded this video.
            ref: "newUser",              // 🔗 Tells MongoDB to find the user in the "newUser" collection.
            required: true               // ❗ A video must have an owner – otherwise, who's responsible?
        }
    },
    {
        timestamps: true // ⏳ Automatically keeps track of when the video was created and last updated.
    }
);

// 🛠️ Custom method: when someone watches the video, we increase the views count.
videoSchema.methods.incrementViews = async function () {
    this.views++;       // ➕ Add 1 to the current views.
    await this.save();  // 💾 Save the updated view count in the database.
};

// 🔌 Plug in the pagination helper so we can fetch videos in pages (like showing 10 per page).
videoSchema.plugin(mongooseAggregatePaginate);

// 🏁 Finally, we compile the blueprint into a real working model called "Video".
// This is what we use in other files to interact with video data in the database.
export const Video = mongoose.model("Video", videoSchema);
