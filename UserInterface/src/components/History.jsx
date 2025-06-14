// We need React to build UI components and use hooks like useState and useEffect
import React, { useState, useEffect } from 'react';

// axios is a tool to talk to the backend server and fetch data
import axios from 'axios';

// Link helps us move from one page to another without refreshing the page
import { Link } from 'react-router-dom';

// We’re creating a new function called History — this is our component that will show the user's watch history
function History() {

  // history will store the list of videos watched, initially it's an empty list
  const [history, setHistory] = useState([]);

  // isLoading tells us whether we are still waiting for data from the server
  const [isLoading, setIsLoading] = useState(true);

  // This function runs **only once** when this component loads — it’s like: “When this page is opened, do this...”
  useEffect(() => {

    // Making a helper function to fetch data from the server
    const fetchHistory = async () => {
      try {
        // We send a GET request to this path to ask the server: “Give me my video history!”
        const response = await axios.get('/api/v1/account/history');

        // We take the useful part from the server's response and store it in our 'history' state
        setHistory(response.data.data);
      } catch (error) {
        // If something goes wrong (like no internet, or server down), we log the error
        console.error('Error fetching history:', error);
      } finally {
        // No matter success or failure — once we try fetching — we say: “Stop showing loading spinner”
        setIsLoading(false);
      }
    };

    // We now actually call the function we just defined to get the data
    fetchHistory();

  }, []); // This empty box means: “Run this only once after the component is first shown”

  // Now we describe what this component will draw on the screen
  return (
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      {/* The outer box for the entire page layout */}

      <div className="mb-4 col-span-full xl:mb-2">
        {/* This is a heading — just big bold text saying “Watch History” */}
        <div className=' text-3xl font-black text-gray-900'>Watch history</div>
        <br />

        {/* If we're still waiting for the server to respond, show a loading spinner */}
        {isLoading ? (
          <div className="text-center my-72">
            <div className="p-4 text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* This round spinner shape is built using two SVG path shapes */}
                  <path
                    d="M100 50.5908C100 78.2051..."
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393..."
                    fill="currentFill"
                  />
                </svg>
                {/* For screen readers */}
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          // If data is **ready**, we start showing the actual content
          <div>
            {/* If there are videos in the history list, we show them */}
            { history.length > 0  ? (
              <section>
                <div className="container">
                  {/* Arrange videos in a neat grid: 1 column on small screens, 2 on medium, 4 on large */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Go through every video and make a card for it */}
                    {history.map((video) => (
                      <div key={video._id}>
                        <div className="relative">
                          {/* Clicking the image should take you to that video's watch page */}
                          <Link to={`/watch/${video._id}`}>
                            {/* Show the thumbnail image of the video */}
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-80 h-40" 
                            />
                          </Link>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div>
                            {/* Show the title of the video as a clickable link */}
                            <h3 className="text-lg font-bold truncate">
                              <Link to={`/watch/${video._id}`}>
                                {video.title}
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              // If there are **no** videos in the history, show this simple message
              <div>No history available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Finally, we export the component so it can be used in other parts of the app
export default History;
