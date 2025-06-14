// We’re bringing in some tools from React
import { useState , useEffect } from "react"; // useState lets us remember values (like memory), useEffect helps us do something when the component appears
import React from 'react'; // React is the boss that controls the UI
import { Link , Outlet } from "react-router-dom"; // Link helps us move from one page to another without refreshing, Outlet displays nested pages
import { useSelector } from 'react-redux'; // useSelector lets us grab data from the global Redux state
import axios from "axios"; // axios helps us talk to the backend (APIs) to fetch or send data

// This is our main function component called YourChannel
function YourChannel() {

  // We’re grabbing the logged-in user's info (like name, id, email, etc.) from Redux state
  const data = useSelector((state) => state.auth.user); // Think of this like pulling your profile from a locker
  
  // We’re creating a new memory box to store full user data fetched from backend
  const [userdata , setUserData]  = useState(); // Right now, it’s empty. Later, we’ll fill it with details like avatar and join date

  // This runs only ONCE when the page appears (because dependency array is empty)
  useEffect(() => {
    // If the user ID exists (just a safety check), then only we go ahead
    if (data._id) {
        // We make a function that will ask backend to give user details
        const fetchUser = async () => {
            try {
                // Using axios to GET data from backend using user ID
                const response = await axios.get(`/api/v1/account/userData/${data._id}`);
                // We store that data into our memory box
                setUserData(response.data.data);
            } catch (error) {
                // If there’s any problem while fetching, we log the error
                console.error('Error fetching user data:', error);
            }
        };

        // Finally, we call that function to fetch user
        fetchUser();
    }
  }, []); // Runs only once (empty array means “no dependencies”)

  // A simple helper function to convert a date into something like "June 2023"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' }; // We only want Year and Month
    const date = new Date(dateString); // Make a real Date object
    return date.toLocaleDateString(undefined, options); // Turn it into readable format based on browser settings
  };

  // Now we build what user will see
  return (
    <>
    {/* Outer container with spacing and responsive layout */}
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      
      {/* This spans all 3 columns - acts like a full-width header */}
      <div className="mb-4 col-span-full xl:mb-2"> 

        {/* ------------------- User Info Section ------------------- */}
        <div className="mt-4 flex items-center gap-5">
          
          {/* If we already fetched userdata, show it */}
          {userdata ? (
            <>
              {/* User avatar or profile picture */}
              <img className="w-28 h-28 rounded-full" src={userdata.avatar} alt="not found"/>

              {/* Right side of profile - name and join date */}
              <div className="font-bold dark:text-black">
                {/* User's name in uppercase, fallback is "ADMIN" if name not found */}
                <div className='text-lg'>{(userdata.name || "Admin").toUpperCase()}</div>

                {/* Join date nicely formatted */}
                <div className="text-sm mb-3 text-gray-500">Joined in {formatDate(userdata.createdAt)}</div>

                {/* Button to customize channel - takes user to a new page */}
                <Link to={"/customize_channel"}>
                  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-2.5 py-2.5 me-2">
                    Customize channel
                  </button>
                </Link>
              </div>
            </>
          ) : (
            // If data isn’t yet loaded, show this text
            <div>Loading user data...</div>
          )}
        </div>

        {/* ------------------- Tabs for Navigation ------------------- */}
        <div className="border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">

            {/* First Tab: All Videos */}
            <li className="me-2">
              <Link
                to={""} // This keeps us on the current page
                className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                {/* An icon using SVG (just decoration) */}
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857...Z" />
                </svg>
                All Videos
              </Link>
            </li>

            {/* Second Tab: Upload Video */}
            <li className="me-2">
              <Link
                to={"upload_video"} // This links to the Upload Video page
                className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                {/* Another decorative SVG icon */}
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 11.424V1a1 1 0 1 0-2 0v...Z" />
                </svg>
                Upload Video
              </Link>
            </li>
          </ul>
        </div>

        {/* ------------------- Page Content Based on Tab ------------------- */}
        <Outlet /> {/* This will display child routes like video list or upload form */}

        {/* ------------------- End of Main Content ------------------- */}
      </div>
    </div>
    </>
  );
}

// We export the component so it can be used in other files
export default YourChannel;
