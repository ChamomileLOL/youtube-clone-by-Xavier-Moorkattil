// src/index.js

// 📦 Bringing in 'path' module from Node.js to handle file and directory paths
import path from 'path';

// 📦 This allows us to find the current file's path since __dirname doesn't exist by default in ES Modules
import { fileURLToPath } from 'url';

// 📦 Loads variables from a .env file into process.env (useful for keeping secrets like DB passwords out of the code)
import dotenv from 'dotenv';

// 🔌 This is our custom MongoDB connection function
import connectDB from './db/index.js';

// 🏗️ The main Express app is imported here (this file configures routes and middleware)
import { app } from './app.js';

// 📦 We also bring in Express here so we can use its 'static' method later
import express from 'express'; // ✅ Required to serve static files like images

// 🔍 Step 1: Figure out the actual file path of this script
// Why? Because __dirname doesn't exist in ES module format
const __filename = fileURLToPath(import.meta.url);  // 🧭 Gets the full path to this file
const __dirname = path.dirname(__filename);         // 🧭 Now we extract the directory part from the full path

// 🌱 Step 2: Load environment variables from the .env file in the root directory
// This lets us use values like PORT, MONGO_URI without writing them directly here
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // 🔐 Securely loads variables

// ✅ Step 3: Log the MongoDB connection string to confirm it loaded correctly
console.log("✅ MONGO_URI loaded:", process.env.MONGO_URI);

// 🕵️ Step 4: Debug the connection string by showing each character and its ASCII code
// This helps catch sneaky invisible bugs like extra spaces or weird characters
console.log("🔍 Debugging MONGO_URI character codes:");
[...process.env.MONGO_URI].forEach((char, idx) => {
  console.log(`${idx}: '${char}' (ASCII ${char.charCodeAt(0)})`);
});

// 📸 Step 5: Make the server share images or video thumbnails stored in /uploads folder
// Any file inside /uploads can now be accessed from the browser
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // ✅ Users can now access files at /uploads/*

// 🚀 Step 6: Connect to MongoDB and launch the server ONLY if DB connection is successful
connectDB()
  .then(() => {
    // 🎯 Pick the port from .env file or default to 8000 if not set
    const PORT = process.env.PORT || 8000;

    // 🟢 Start the Express server and print the URL where it's running
    app.listen(PORT, () => {
      console.log(`⚙️ Server is live at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // ❌ If anything goes wrong while connecting to MongoDB, show the error here
    console.error("❌ MongoDB connection failed:", error);
  });
