// We're bringing in the main detective tools: React hooks and routing helpers.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // lets us jump between pages
import { useSelector } from 'react-redux'; // allows us to access login info stored globally
import axios from 'axios'; // helps us send/receive data from the server

// This function lets the user change their channel details
function CustomizeChannel() {
  // We're getting the currently logged-in user from the global Redux store
  const user = useSelector((state) => state.auth.user);

  // This lets us redirect the user to another page
  const navigate = useNavigate();

  // State to show loading spinner while fetching or updating
  const [loading, setLoading] = useState(false);

  // State to store user data fetched from the backend
  const [userData, setUserData] = useState(null);

  // These states hold the new inputs: profile picture, name, email, password
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This code runs when the component loads (like turning on the light to look around)
  useEffect(() => {
    // If no user ID, skip everything
    if (!user._id) return;

    // This is the function to get the user's existing data from the backend
    const fetchUserData = async () => {
      try {
        setLoading(true); // Turn on the loading signal
        const res = await axios.get(`/api/v1/account/userData/${user._id}`);
        const data = res.data.data;
        setUserData(data); // Store the user’s current info
        setName(data.name); // Fill name input with current name
        setEmail(data.email); // Fill email input
        // Password is not shown for security reasons
      } catch (error) {
        console.error('Failed to fetch user data:', error); // Log any mistake
      } finally {
        setLoading(false); // Turn off loading
      }
    };

    fetchUserData(); // Call the detective function
  }, [user._id]); // This code runs again only if user ID changes

  // When user selects a new file (image), we store it
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save the selected image file
  };

  // If user clicks "Cancel", we double-check and then take them back
  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to discard your changes?");
    if (confirmCancel) navigate("/your_channel"); // Go back to their channel page
  };

  // When the user submits the form, we update their channel
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Stop page from reloading

    // Basic validation
    if (!name.trim() || !email.trim()) {
      return alert("Name and Email cannot be empty.");
    }
    if (password && password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    // Prepare the data to send
    const formData = new FormData(); // Like a suitcase for files + text
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password); // Only if password is typed
    if (file) formData.append("avatar", file); // Only if image is selected

    try {
      setLoading(true); // Show loading
      await axios.put(`/api/v1/account/update/${userData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Tell server we are sending file
      });
      alert("Channel updated successfully!");
      navigate("/your_channel"); // After success, go back to channel
    } catch (error) {
      console.error("Update failed:", error); // Log any error
      alert("Something went wrong while updating."); // Tell user about the error
    } finally {
      setLoading(false); // Hide loading
    }
  };

  // If loading is true, we show a spinner
  if (loading) {
    return (
      <div className="text-center my-72">
        <div role="status">
          <svg className="inline w-8 h-8 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none">
            <path d="M100 50.6C100 78.2 77.6 100.6 50 100.6S0 78.2 0 50.6C0 23 22.4 0.6 50 0.6S100 23 100 50.6Z" fill="currentColor" />
            <path d="M94 39C96.4 38.4 97.9 35.9 97 33.6C95.3 28.8 92.9 24.4 89.8 20.3C85.8 15.1 80.9 10.7 75.2 7.4..." fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // This is the main form for editing the user’s channel
  return (
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      <div className="mb-4 col-span-full xl:mb-2">
        {userData ? (
          <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="max-w-3xl">
            {/* Input for Name */}
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Name</label>
            <p className="mb-3 text-sm text-gray-500">Choose a name that fits your identity. You can only change twice in 14 days.</p>
            <input
              type="text" id="name" name="name" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="XAVIER MOORKATTIL"
            />

            {/* Input for Email */}
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <p className="mb-3 text-sm text-gray-500">Make sure this is up to date for security.</p>
            <input
              type="email" id="email" name="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="xavier@example.com"
            />

            {/* Show image preview if selected or already exists */}
            {(file || userData.avatar) && (
              <img
                src={file ? URL.createObjectURL(file) : userData.avatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full mb-3"
              />
            )}

            {/* Avatar Upload */}
            <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-gray-900">Avatar</label>
            <p className="mb-3 text-sm text-gray-500">Use a square photo (at least 98x98, max 4MB).</p>
            <input
              type="file" id="avatar" name="avatar"
              onChange={handleFileChange}
              className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            />

            {/* Password */}
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">New Password</label>
            <p className="mb-3 text-sm text-gray-500">You can leave this blank if you don't want to change it.</p>
            <input
              type="password" id="password" name="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="********"
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="text-white bg-gray-700 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {loading ? 'Updating...' : 'Edit'}
              </button>
            </div>
          </form>
        ) : (
          <div>Loading user data...</div> // Just in case userData is not ready
        )}
      </div>
    </div>
  );
}

// We export this component so it can be used in other parts of the app
export default CustomizeChannel;
