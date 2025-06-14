// We need axios to send HTTP requests (like GET, POST, DELETE) to our server.
import axios from 'axios';

// React helps us build components. We’re using useEffect and useState from it.
import React, { useEffect, useState } from 'react';

// Link lets us move from one page to another without refreshing the site.
import { Link } from 'react-router-dom';

// useSelector is used to get values from Redux store (kind of like our global memory).
import { useSelector } from 'react-redux';

// 👇 This component shows *all videos* uploaded by the current user.
function AllVideo() {
  // Getting current user data from Redux store (we need the user's ID to get their videos).
  const userdata = useSelector((state) => state.auth.user);

  // Creating a list to store videos once we get them from the backend.
  const [videos, setVideos] = useState([]);

  // This helps us show a loading spinner while things are loading.
  const [loader, setLoader] = useState(false);

  // ⏳ When the page loads, this will automatically run once (like: “hey, do this when I arrive!”).
  useEffect(() => {
    // This function will fetch all videos uploaded by the current user.
    const fetchVideos = async () => {
      try {
        setLoader(true); // Start spinner
        const response = await axios.get(`/api/v1/videos/allUserVideo/${userdata._id}`);
        setVideos(response.data.data); // Save videos in state
        setLoader(false); // Stop spinner
      } catch (error) {
        console.error('Error fetching videos:', error); // If anything goes wrong, show error
        setLoader(false);
      }
    };

    // Actually call the function we wrote above
    fetchVideos();
  }, [userdata._id]); // Only run this when user ID changes

  // 🧹 This function deletes a video if user confirms
  const handleDelete = async (videoId) => {
    // Ask the user if they are sure they want to delete
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        setLoader(true); // Show spinner
        await axios.delete(`/api/v1/videos/delete/${videoId}`); // Ask backend to delete
        setVideos(videos.filter(video => video._id !== videoId)); // Remove from state (frontend)
        setLoader(false);
        alert("Video deleted successfully!"); // Notify user
      } catch (error) {
        console.error('Error deleting video:', error);
        setLoader(false);
      }
    }
  };

  // 📺 JSX return – what we see on the screen
  return (
    loader ? (
      // If loading, show a spinner
      <div className="text-center my-44">
        <div className="p-4 text-center">
          <div role="status">
            {/* Spinner SVG animation */}
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none">
              <path d="..." fill="currentColor"/>
              <path d="..." fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    ) : (
      // Once loading is done, show the videos
      <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <section>
            <div className="container">
              {/* Loop through all videos and show each */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <div key={video._id}>
                    <div className="relative">
                      {/* Click this image to go to the video’s watch page */}
                      <Link to={`/watch/${video._id}`}>
                        <img src={video.thumbnail} alt={video.title} className="w-80 h-40" />
                      </Link>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div>
                        {/* Show video title */}
                        <h3 className="text-lg font-bold truncate">
                          <Link to={`/watch/${video._id}`}>{video.title}</Link>
                        </h3>
                      </div>
                      <div className="mt-2">
                        <ul className="flex items-center space-x-2">
                          {/* Delete button – trash icon */}
                          <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center mt-5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => handleDelete(video._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                            </svg>
                          </button>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}

// 🚀 Export this so other files can use it
export default AllVideo;
