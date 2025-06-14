// 🕵️ This file is like a detective's notebook: it tells Tailwind where to look and how to behave in your project.

/** @type {import('tailwindcss').Config} */
// This line is like telling your assistant which manual or guidebook to follow.
// "Hey Tailwind, here's the structure of the config you're about to read."
// (Type hinting for tools like VS Code to help auto-complete and detect mistakes)

export default {
  // 🗺️ The 'content' section is our map. We're telling Tailwind where to search for clues (classes).
  content: [
    "./index.html",                // 🔍 Look inside the main HTML file at the root.
    "./src/**/*.{js,ts,jsx,tsx}", // 🔍 Dive into every file inside 'src' folder, and search all .js, .ts, .jsx, and .tsx files.
    // The '**/*' means: go into every folder, every subfolder, every file, no matter how deep.
  ],

  // 🎨 The 'theme' section is like a painter's palette. We can add or tweak colors, fonts, sizes here.
  theme: {
    extend: {
      // This is your empty canvas. You're saying: "I'm not adding anything new right now,
      // but I'm leaving the door open for customization later."
    },
  },

  // 🧩 The 'plugins' section is where we add extra tools or helpers to Tailwind. Think of them like detective gadgets.
  plugins: [
    require('@tailwindcss/aspect-ratio'), 
    // 🧪 This plugin helps us maintain the correct width-to-height ratio for elements like videos and images.
    // It's like saying: "Keep my frames always proportional, no matter the screen size."

    // Add more plugins here if you need them later. Just like adding new tools to your kit.
  ],
}
