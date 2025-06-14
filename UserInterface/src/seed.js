// This file fills the MongoDB database with sample data: user, videos, and a channel.
// Think of it like setting the stage before the play begins.

import mongoose from "mongoose"; // MongoDB driver — helps us talk to our database.
import dotenv from "dotenv"; // Allows us to load secret keys (like the database URL) from a hidden `.env` file.
import User from "./models/User.js"; // The User model — represents people who use the app.
import Video from "./models/Video.js"; // The Video model — represents videos that users can upload or watch.
import Channel from "./models/Channel.js"; // The Channel model — represents a collection of videos owned by a user.

dotenv.config(); // Load all the hidden environment variables from `.env` file. Like opening a locked drawer with a key.

const MONGO_URI = process.env.MONGO_URI; // Fetch the MongoDB URL from the `.env` file. This tells us *where* the database lives.

const seedDatabase = async () => { // Start a special async function — kind of like saying, "Let's run the full setup plan now."
  try {
    await mongoose.connect(MONGO_URI); // Connect to the database using the address we got earlier.
    console.log("✅ MongoDB connected successfully."); // Celebrate the win — we’re in!

    // Clean the slate: delete everything from past attempts. No ghosts in the system!
    await Promise.all([
      User.deleteMany(), // Remove all old users
      Video.deleteMany(), // Remove all old videos
      Channel.deleteMany(), // Remove all old channels
    ]);
    console.log("🧹 Cleared existing data from User, Video, and Channel collections."); // Confirm it’s all clean.

    // Create one demo user — a simple fellow to own everything.
    const sampleUser = new User({
      username: "xavier123",
      email: "xavier@example.com",
      password: "hashedpassword123", // Warning! This is not encrypted. Just a placeholder for now.
    });
    await sampleUser.save(); // Save the user to the database. Like registering someone officially.

    // Create a list of cool videos to insert — these are hand-picked gems.
    const videoData = [
      {
        title: "Steve Jobs’ Stanford Speech",
        description: "Stay Hungry, Stay Foolish — life and purpose.",
        url: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
        thumbnail: "sample1.jpeg",
        category: "🎬 Storytelling",
      },
      {
        title: "The Last Lecture",
        description: "Randy Pausch on childhood dreams.",
        url: "https://www.youtube.com/watch?v=ji5_MqicxSo",
        thumbnail: "sample2.jpeg",
        category: "🎬 Storytelling",
      },
      {
        title: "This is Water – David Foster Wallace",
        description: "Animated reflection on awareness.",
        url: "https://www.youtube.com/watch?v=ms2BvRbjOYo",
        thumbnail: "sample3.jpeg",
        category: "🎬 Storytelling",
      },
      {
        title: "Kurzgesagt – The Egg",
        description: "A stunning philosophical animation.",
        url: "https://www.youtube.com/watch?v=h6fcK_fRYaI",
        thumbnail: "sample4.jpeg",
        category: "🧠 Education",
      },
      {
        title: "Physics Meets Pi",
        description: "How colliding blocks reveal π.",
        url: "https://www.youtube.com/watch?v=HEfHFsfGXjs",
        thumbnail: "sample5.jpeg",
        category: "🧠 Education",
      },
      {
        title: "Vsauce – Eye Resolution",
        description: "Limits of human vision explored.",
        url: "https://www.youtube.com/watch?v=4I5Q3UXkGd0",
        thumbnail: "sample6.jpeg",
        category: "🧠 Education",
      },
      {
        title: "Essence of Linear Algebra",
        description: "Math concepts visualized by 3Blue1Brown.",
        url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
        thumbnail: "sample7.jpeg",
        category: "🧠 Education",
      },
      {
        title: "How Wolves Change Rivers",
        description: "Ecological impact of wolves in Yellowstone.",
        url: "https://www.youtube.com/watch?v=ysa5OBhXz-Q",
        thumbnail: "sample8.jpeg",
        category: "🌍 Society",
      },
      {
        title: "The Social Dilemma Clip",
        description: "Social media's hidden consequences.",
        url: "https://www.youtube.com/watch?v=uaaC57tcci0",
        thumbnail: "sample9.jpeg",
        category: "🌍 Society",
      },
      {
        title: "Elon Musk: TED Interview",
        description: "The future we’re building.",
        url: "https://www.youtube.com/watch?v=zIwLWfaAg-8",
        thumbnail: "sample10.jpeg",
        category: "🌍 Society",
      },
      {
        title: "Carl Sagan – Pale Blue Dot",
        description: "Earth’s fragility and unity.",
        url: "https://www.youtube.com/watch?v=wupToqz1e2g",
        thumbnail: "sample11.jpeg",
        category: "🌌 Wonder",
      },
      {
        title: "Feynman – Beauty of Physics",
        description: "Science and poetic understanding.",
        url: "https://www.youtube.com/watch?v=cRmbwczTC6E",
        thumbnail: "sample12.jpeg",
        category: "🌌 Wonder",
      },
      {
        title: "Jocko Willink – Good",
        description: "Adapt and overcome setbacks.",
        url: "https://www.youtube.com/watch?v=IdTMDpizis8",
        thumbnail: "sample13.jpeg",
        category: "💡 Motivation",
      },
      {
        title: "Jordan Peterson – To Millennials",
        description: "Responsibility and meaning in life.",
        url: "https://www.youtube.com/watch?v=XbOeO_frzvg",
        thumbnail: "sample14.jpeg",
        category: "💡 Motivation",
      },
      {
        title: "OK Go – This Too Shall Pass",
        description: "A one-take artistic music video.",
        url: "https://www.youtube.com/watch?v=qybUFnY7Y8w",
        thumbnail: "sample15.jpeg",
        category: "🎨 Art",
      },
    ].map((v) => ({ ...v, owner: sampleUser._id })); // Attach the sample user as the owner to every video — like tagging them as the uploader.

    const insertedVideos = await Video.insertMany(videoData); // Put all those videos into the database in one go.
    console.log("🎥 Sample videos inserted."); // Confirmation that the upload was successful.

    // Now create a sample channel and link all these videos to it.
    const sampleChannel = new Channel({
      channelName: "Xavier's Vault", // The name of the channel — mysterious and cool.
      description: "Curated videos by Xavier.", // What the channel is about.
      owner: sampleUser._id, // Who owns this channel? Our sample user.
      videos: insertedVideos.map((v) => v._id), // List of video IDs added to this channel.
    });
    await sampleChannel.save(); // Save this shiny new channel into the database.

    console.log("📺 Sample channel created and linked."); // The channel is officially live and linked to its videos.
    console.log("✅ Database seeding complete!"); // Final confirmation — mission complete.
    process.exit(0); // Exit the script without errors.
  } catch (error) {
    console.error("❌ Seeding error:", error); // If something goes wrong, scream it out clearly.
    process.exit(1); // Exit the script with an error status.
  }
};

seedDatabase(); // And finally — call the function to run everything above.
