// 🧠 Importing the essential tools to build our component
import React, { useEffect, useState } from 'react'; // React helps build UI, useEffect runs side effects, useState holds data
import axios from 'axios'; // Axios helps us talk to the server (like calling a waiter in a restaurant)
import { Link } from 'react-router-dom'; // Link lets us move between pages without reloading the whole site

// 🏠 This is our Home page component, where we show a list of videos
const Home = () => {

  // 🧺 These are our data containers (called "states")
  const [videos, setVideos] = useState([]); // To hold all the videos we get from server
  const [loading, setLoading] = useState(true); // To show "Loading..." while videos are being fetched
  const [searchTerm, setSearchTerm] = useState(''); // For storing whatever the user types into search box
  const [category, setCategory] = useState(''); // To store which category (like Music, React) user selected

  // 🔄 This code runs automatically when searchTerm or category changes
  useEffect(() => {
    // 📞 This function fetches videos based on search or category
    const fetchVideos = async () => {
      setLoading(true); // First, show the loading spinner

      try {
        let url = '/api/v1/videos/allVideo'; // Default: get all videos

        // 🧐 But if the user typed something to search...
        if (searchTerm.trim()) {
          url = `/api/v1/videos/search?title=${encodeURIComponent(searchTerm)}`;
        } 
        // 🎯 Or if user picked a category like "Gaming" or "Music"
        else if (category) {
          url = `/api/v1/videos/filter?category=${encodeURIComponent(category)}`;
        }

        // 📡 Now make the request to get videos from that URL
        const response = await axios.get(url);

        // ✅ Save the videos we got into the videos state
        setVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching videos:', error); // 🧯 If anything breaks, show the error
      } finally {
        setLoading(false); // ❌ Hide the loading once we’re done (success or failure)
      }
    };

    // 🧨 Call the function we just defined
    fetchVideos();

  }, [searchTerm, category]); // This only runs when searchTerm or category changes

  // 📚 List of categories for filtering
  const categories = ["Music", "React", "Gaming", "Education", "Sports"];

  // 🖼️ This is the UI of the Home page
  return (
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      <div className="mb-4 col-span-full xl:mb-2">

        {/* 🔍 Search box where user types video name */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm} // 🧠 Shows what user has typed
            onChange={(e) => setSearchTerm(e.target.value)} // 📝 Updates searchTerm when user types
            placeholder="Search videos..." // 🌫️ Grey hint inside box
            className="w-full border px-4 py-2 rounded shadow"
          />
        </div>

        {/* 🧷 Category buttons like "Music", "React", etc. */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)} // 🖱️ When clicked, store selected category
              className={`px-4 py-2 rounded-full border ${
                category === cat ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
          
          {/* ❌ Show this only if some category is selected, to allow clearing it */}
          {category && (
            <button 
              onClick={() => setCategory('')} 
              className="text-sm underline text-blue-600"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* 🎞️ This section shows either loading message or grid of video cards */}
        {loading ? (
          <div className="text-center py-32">Loading videos...</div> // ⏳ Simple loading message
        ) : (
          <section>
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <div 
                    key={video._id} 
                    className="shadow rounded-lg overflow-hidden"
                  >
                    <Link to={`/watch/${video._id}`}> {/* 🔗 Clickable video link */}
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                    </Link>
                    <div className="mt-2 px-2 pb-2">
                      <h3 className="text-base font-semibold truncate">
                        <Link to={`/watch/${video._id}`}>{video.title}</Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// 🚀 Finally, we export the Home component so others can use it
export default Home;
