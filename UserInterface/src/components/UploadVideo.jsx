import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const UploadVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    videoFile: null
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));

    try {
      setLoading(true);
      await axios.post('/api/v1/videos/publish', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Video uploaded successfully!');
      navigate('/your_channel');
    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('⚠️ Something went wrong during upload.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="w-10 h-10 animate-spin fill-black" viewBox="0 0 100 101">
          <circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="10" fill="none" />
          <path d="M50 15a35 35 0 1 0 35 35" fill="currentFill" />
        </svg>
        <p className="ml-3 text-gray-700">Uploading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mt-6">
        <button
          onClick={toggleModal}
          className="text-white bg-gray-800 hover:bg-gray-900 rounded-full px-6 py-2 text-sm"
        >
          + Create
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold">Upload a New Video</h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="file"
                name="thumbnail"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="file"
                name="videoFile"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full border p-2 rounded"
                required
              />

              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded"
              >
                Upload Video
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadVideo;
