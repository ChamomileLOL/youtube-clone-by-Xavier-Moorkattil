// 🕵️ Step 1: Calling our reliable tools before the investigation begins
import express from "express";             // Importing the Express.js framework – our main guy to handle server stuff
import cors from "cors";                   // Brings in Cross-Origin Resource Sharing – lets our frontend safely talk to our backend
import cookieParser from "cookie-parser";  // Helps us read cookies that users might bring along

// import bodyParser from "body-parser";  // Old-school way to parse JSON. We're skipping this because Express has it built-in now.

// 🎬 Step 2: Creating the main app object – this will be our control room
const app = express();

// 🔐 Step 3: Unlock the CORS gate for trusted visitors only
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Only allow frontend from this specific place (like your own React app)
    credentials: true                 // Let frontend send cookies or login tokens, and we allow reading them
}));

// 🧠 Step 4: Telling the app to understand JSON files up to 16 kilobytes
app.use(express.json({ limit: "16kb" }));  // Accept JSON data from requests, but not too big (just enough to avoid abuse)

// 🧾 Step 5: Also accept form data from the browser (like login forms, etc.)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// 🖼️ Step 6: Allow serving images, videos, or static files from a folder called "public"
app.use(express.static("public"));

// 🍪 Step 7: Activate cookie reader so we can handle login sessions, etc.
app.use(cookieParser());

// 🧭 Step 8: Load the routes that guide people to correct handlers
// These act like the different desks in our office where requests are handled

// 📂 User account-related actions like signup or login
import userAccount from './routes/account.routes.js';

// 📺 Video-related actions like upload, watch, delete
import videoRouter from "./routes/video.routes.js";

// (🔕 The rest are currently muted – you can bring them in later when needed)
// import userRouter from './routes/user.routes.js';
// import healthcheckRouter from "./routes/healthcheck.routes.js";
// import tweetRouter from "./routes/tweet.routes.js";
// import subscriptionRouter from "./routes/subscription.routes.js";
// import commentRouter from "./routes/comment.routes.js";
// import likeRouter from "./routes/like.routes.js";
// import playlistRouter from "./routes/playlist.routes.js";
// import dashboardRouter from "./routes/dashboard.routes.js";

// 🛣️ Step 9: Now we assign URLs to their respective routers
// It's like assigning each guest a counter to report to

// For anything that starts with "/api/v1/account", go to the userAccount desk
// Example: http://localhost:8000/api/v1/account/signup
app.use("/api/v1/account", userAccount);

// For anything related to videos, route it to the video handling desk
// Example: http://localhost:8000/api/v1/videos/upload
app.use("/api/v1/videos", videoRouter);

// 🛑 The rest are still waiting in the wings. Uncomment when ready.
// app.use("/api/v1/healthcheck", healthcheckRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/tweets", tweetRouter);
// app.use("/api/v1/subscriptions", subscriptionRouter);
// app.use("/api/v1/comments", commentRouter);
// app.use("/api/v1/likes", likeRouter);
// app.use("/api/v1/playlist", playlistRouter);
// app.use("/api/v1/dashboard", dashboardRouter);

// 🧯 Step 10: Error handling system – if anything goes wrong, this section catches it
// It's like having a medic on standby, but it's off-duty for now.
// app.use((err, req, res, next) => {
//     console.error(err.stack);  // Show error details in the server log
//     res.status(err.status || 500).json({
//         error: {
//             message: err.message || "Internal Server Error",  // Tell the user what went wrong
//         },
//     });
// });

// 🎁 Final step: Hand over the app object so the main server file can use it
export { app };
