// Bringing in the React powers—so we can build components and use hooks like useState and useEffect.
import React, { useEffect, useState } from 'react';

// axios is like our undercover agent—it goes out, talks to the server, and brings us back the data.
import axios from 'axios';

// Link is our silent transporter. Instead of reloading the whole page, it sneaks us to another route inside the app.
import { Link } from 'react-router-dom';

// This is our main Home component—like the front gate of a building, where everything starts.
const Home = () => {
  // This is where we store the list of videos we fetch—like putting them into a safe storage.
  const [videos, setVideos] = useState([]);

  // This tells us whether the videos are still being fetched (true) or done (false).
  const [loading, setLoading] = useState(true);

  // This runs **once** when the component shows up—like a spy doing recon on day one.
  useEffect(() => {
    // Our secret mission: Fetch all videos from the server.
    const fetchVideos = async () => {
      try {
        // We send a GET request to our server—asking for all videos.
        const response = await axios.get('/api/v1/videos/allVideo');

        // If successful, we store the videos in our state locker.
        setVideos(response.data.data);
      } catch (err) {
        // If something goes wrong—print the error like a warning message.
        console.error('Error fetching videos:', err);
      } finally {
        // No matter what happens, we stop showing the loading spinner.
        setLoading(false);
      }
    };

    // We trigger the mission.
    fetchVideos();
  }, []); // The empty array means: “Only run this once, when component is first shown.”

  // If we're still waiting for videos, show the loader spinner instead of the page.
  if (loading) {
    return (
      <div className="text-center my-72">
        {/* Centered loading message with an animated circle—like a spinning compass. */}
        <div role="status" className="p-4">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin fill-black"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* This SVG is like the skeleton of the spinning circle. */}
            <path
              fill="currentColor"
              d="M100 50.59C100 78.2 77.61 100.59 50 100.59..."
            />
            {/* This part gives the spinning animation its “loading” energy. */}
            <path
              fill="currentFill"
              d="M93.97 39.04C96.39 38.4 97.86 35.91..."
            />
          </svg>
          {/* For screen readers: silently say “Loading...” */}
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Now we’re done loading—so we show the grid of videos.
  return (
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      <div className="mb-4 col-span-full xl:mb-2">
        <section>
          <div className="container">
            {/* This creates a responsive grid of video cards. Adjusts layout for different screen sizes. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Loop through each video and create a card for it */}
              {videos.map((video) => (
                // Every video needs a unique key so React doesn’t get confused while updating.
                <div
                  key={video._id}
                  className="shadow rounded-lg overflow-hidden"
                >
                  {/* Show the video thumbnail inside a clickable area */}
                  <div className="relative">
                    {/* When clicked, this takes the user to the watch page for that video */}
                    <Link to={`/watch/${video._id}`}>
                      <img
                        src={video.thumbnail} // 📸 This is the thumbnail image for the video
                        alt={video.title} // For screen readers and if image doesn’t load
                        className="w-full h-40 object-cover" // Image takes full width and fixed height
                      />
                    </Link>
                  </div>

                  {/* Under the thumbnail, we show the video title */}
                  <div className="mt-2 px-2 pb-2">
                    <h3 className="text-base font-semibold truncate">
                      {/* Title is also clickable, goes to watch page */}
                      <Link to={`/watch/${video._id}`}>
                        {video.title}
                      </Link>
                    </h3>
                    {/* We could show more details like views or upload date here, but it’s commented out for now */}
                    {/* <p className="text-xs text-gray-500">Views: {video.views}</p> */}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// We export this component so it can be used in other parts of our app.
export default Home;
