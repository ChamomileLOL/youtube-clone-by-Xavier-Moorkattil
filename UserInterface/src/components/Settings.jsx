// We call in our partner: React
import React from 'react'

// We import tools for navigation and linking between pages
import { Link, useNavigate } from 'react-router-dom'

// We bring in an image file to display in the settings section
import img from "../assets/gde-najti-ssylku-na-svoj-kanal-youtube.jpg"

// Axios is our undercover agent — helps us send/receive data from backend
import axios from 'axios'

// useState is like a memory slot for changes — helps us track loading status
import { useState } from 'react'

// useSelector helps us grab data from our global store (Redux) — like accessing the user’s file
import { useSelector } from 'react-redux';

function Settings() {
  // A notepad to track if something (like deletion) is in progress
  const [loader, setLoader] = useState(false)

  // We fetch the currently logged-in user's data from the Redux global state
  const userdata = useSelector((state) => state.auth.user);

  // A tool to move from one page to another (like sending someone to the signup page after deleting account)
  const history = useNavigate()

  // When the user clicks on 'Delete', this function runs
  const handleDeleteClick = async () => {
    // We pop up a message asking: "Are you sure?"
    const value = confirm("Are you sure ?");

    // If the user says "yes"
    if (value) {
      try {
        // Start the spinner animation
        setLoader(true)

        // Send a DELETE request to the server with the user's ID to delete their channel
        const res = await axios.delete(`/api/v1/account/delete/${userdata._id}`)

        // Stop the spinner once deletion is successful
        setLoader(false)

        // Tell the user: "Channel is gone"
        alert("Your channel is deleted !");

        // Move the user to the signup page
        history("/signup");

      } catch (error) {
        // If there was an error during deletion, print it for developers
        console.log("Channel delete error :", error);

        // Tell the user something went wrong
        alert(error);
      }
    }
  }

  // Now we return what the user sees on the screen
  return (
    loader ? (
      // If loading is true, show this spinner screen
      <div className="text-center my-72">
        <div className="p-4 text-center">
          <div role="status">
            <svg aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin fill-black"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
                fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116..."
                fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    ) : (
      // If not loading, show the Settings page
      <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          {/* -------- Title -------- */}
          <div className='text-lg mb-8 '>Settings</div>

          {/* -------- Card with image and heading -------- */}
          <div className="mb-16 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row max-w-6xl ">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Set up YouTube exactly how you want it
              </h5>
            </div>
            <img className="ms-auto object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={img} alt="" />
          </div>

          {/* -------- Table for Edit and Delete -------- */}
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 ">
              <tbody>
                {/* Row for Edit Channel */}
                <tr className="bg-white">
                  <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Edit channel
                  </th>
                  <td className="px-6 py-4">
                    {/* Link to customize channel page */}
                    <Link to={"/customize_channel"}
                      className="font-medium text-blue-600 hover:underline">Edit</Link>
                  </td>
                </tr>

                {/* Row for Delete Channel */}
                <tr className="bg-white">
                  <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Delete channel
                  </th>
                  <td className="px-6 py-4">
                    {/* Button to delete the account */}
                    <button onClick={handleDeleteClick}
                      className="font-medium text-blue-600 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  )
}

// We send out this component so others can use it
export default Settings
