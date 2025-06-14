// 📦 We are importing each part of the YouTube clone app one by one.
// It's like bringing tools from your toolbox — one tool per feature/page.

import Home from "./Home";                      // 🏠 This is the homepage — where all videos show up.
import Navbar from "./Navbar";                  // ☝️ The top navigation bar — search, logo, etc.
import Sidebar from "./Sidebar";                // 📚 The menu on the left side — links to other pages.
import YourChannel from "./YourChannel";        // 📺 Your own channel page — where your uploaded videos live.
import History from "./History";                // 🕒 Shows the videos you've already watched.
import Playlist from "./Playlist";              // 📂 Your saved or created playlists of videos.
import Like from "./Like";                      // ❤️ List of videos you've liked.
import Create from "./Create";                  // ➕ A page or button to upload or start creating content.
import CustomizeChannel from "./CustomizeChannel"; // 🧑‍🎨 Lets you change your channel name, pic, details, etc.
import Login from "./Login";                    // 🔐 Page where users sign in.
import Signup from "./Signup";                  // 📝 Page where new users register or create an account.
import Settings from "./Settings";              // ⚙️ Control your preferences — like privacy or language.
import Shorts from "./Shorts";                  // 📱 Short vertical videos like Reels/TikToks.
import Video from "./Video";                    // ▶️ Page to watch a single full video.
import UploadVideo from "./UploadVideo";        // ⬆️ Where a user adds a new video to the platform.
import AllVideo from "./AllVideo";              // 🧾 Shows all the videos uploaded by the current user.
import AuthLayout from "./AuthLayout";          // 🔒 A wrapper that protects private routes (like channel or upload).
import Main from "./Main";                      // 🧠 The central brain or root layout — it connects everything.

// 🛫 Now we export all these components together.
// Think of it like packing all the above files into one suitcase
// so that we can take it anywhere (like another file or folder) and use them easily.

export {
    Home,                  // Homepage component
    Navbar,                // Top bar
    Sidebar,               // Side menu
    YourChannel,           // Your own profile/channel page
    History,               // Watch history
    Playlist,              // Playlists
    Like,                  // Liked videos
    Create,                // Add/Create button or page
    CustomizeChannel,      // Edit your channel details
    Login,                 // Sign-in page
    Signup,                // Register new account
    Settings,              // Preferences and settings
    Shorts,                // Short videos like reels
    Video,                 // Watch one video
    UploadVideo,           // Upload a new video
    AllVideo,              // View all your uploaded videos
    AuthLayout,            // Protects logged-in routes
    Main                   // Main layout (brain of app)
};
