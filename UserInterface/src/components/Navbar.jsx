// Bringing in tools from React for managing state and running logic when the component loads
import { useState, useEffect } from 'react';
import React from 'react';

// Pulling in the logo image so we can show it on the top left
import logo from '../assets/YouTube_Logo_2017.svg.png';

// Used to link between pages without reloading
import { Link } from 'react-router-dom';

// For sending actions to the Redux store
import { useDispatch } from 'react-redux';

// Bringing in the logout action to log the user out
import { logout } from '../store/slice/authSlice';

// To read data from the Redux store
import { useSelector } from 'react-redux';

// Used to talk to the backend server
import axios from 'axios';

// This is the main Navbar function. It gets a prop called openChange which will trigger the sidebar toggle.
function Navbar({ openChange }) {

  // Holds the current user's data (like name and avatar)
  const [userdata, setUserData] = useState(null);

  // Controls whether the dropdown (profile options) is visible
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Prepares the tool to send actions to Redux (like logout)
  const dispatch = useDispatch();

  // Function: Runs when the hamburger icon is clicked. Opens the sidebar.
  const toggleSidebar = () => {
    console.log("Sidebar toggle triggered"); // Debug log
    openChange(); // Tells the parent component to toggle sidebar visibility
  };

  // Function: Opens or closes the profile dropdown menu
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Flip the boolean value
  };

  // Function: When user clicks Sign out, logout is triggered
  const handleSignOut = () => {
    dispatch(logout()); // Dispatches logout action to Redux
    console.log("Sign out clicked"); // Debug message
  };

  // Reads whether the user is logged in
  const authStatus = useSelector((state) => state.auth.status);

  // Grabs user info like user ID from the Redux store
  const data = useSelector((state) => state.auth.user);

  // Runs when the component loads or when 'data' changes
  useEffect(() => {
    // Function: Gets user data from server based on user ID
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/account/userData/${data._id}`);
        const userData = response.data.data;
        setUserData(userData); // Saves it in state
      } catch (error) {
        console.error('Error fetching user data:', error); // If error, print it
      }
    };

    // Call the function
    fetchUser();
  }, [data]); // Runs again if user data in Redux changes

  return (
    <>
      {/* Navbar is fixed at top, always visible. Has a white background and bottom border. */}
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          {/* Outer flex container: Spreads left and right parts of the navbar */}
          <div className="flex items-center justify-between">

            {/* Left side: Menu icon, logo, and search bar */}
            <div className="flex items-center justify-start">
              
              {/* Hamburger button to open/close sidebar */}
              <button
                onClick={toggleSidebar} // Runs function when clicked
                className="fixed top-1 lg:top-2 left-3 z-40 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-100 group"
              >
                {/* SVG icon: three lines (hamburger icon) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo that links to homepage */}
              <a className="flex ml-14 md:mr-24" href="/">
                <img src={logo} className="mr-2.5 h-6" alt="YouTube Logo" />
              </a>

              {/* Search bar: only shows on large screens */}
              <form
                action="#"
                method="get"
                className="hidden lg:block lg:pl-3.5"
                style={{ marginLeft: 300 }}
              >
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>

                {/* Input box for typing search text */}
                <div className="relative mt-1 lg:w-96">
                  {/* Magnifying glass icon inside input */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Actual search input box */}
                  <input
                    type="text"
                    style={{ height: 34 }}
                    name="search"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            {/* Right side: Profile menu (shows only if user is logged in) */}
            {authStatus && (
              <div className="relative ml-auto lg:ml-4">

                {/* Button with user profile image */}
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button-2"
                  aria-expanded={dropdownVisible}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>

                  {/* If userdata is available, show avatar */}
                  {userdata ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userdata.avatar}
                      alt="User"
                    />
                  ) : (
                    // If userdata is loading, show spinner icon
                    <li className="flex items-center">
                      <div role="status">
                        <svg aria-hidden="true" className="w-6 h-6 me-2 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 ..." fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 ..." fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </li>
                  )}
                </button>

                {/* Dropdown menu: shows if button is clicked */}
                {dropdownVisible && (
                  <div className="absolute right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg" id="dropdown-2">
                    
                    {/* If userdata available, show user details */}
                    {userdata ? (
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-900">{userdata.name}</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{userdata.email}</p>
                      </div>
                    ) : (
                      <div>Loading user data...</div>
                    )}

                    {/* Dropdown list items */}
                    <ul className="py-1">
                      <li>
                        <Link to="/your_channel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

// Exporting so other parts of the app can use this Navbar
export default Navbar;
