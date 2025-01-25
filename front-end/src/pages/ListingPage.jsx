import React, { useState } from "react";

const ListingPage = () => {
  // State variables for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reel created successfully!");
    // Add further handling logic for submitting the reel (e.g., saving it to the server, blockchain, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Create a New Reel</h1>

      {/* Form to create a new reel */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="text-xl font-semibold text-pink-500">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter the title of your reel"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="text-xl font-semibold text-pink-500">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter a description for your reel"
              rows="4"
              required
            />
          </div>

          {/* Video Link Input */}
          <div>
            <label htmlFor="videoLink" className="text-xl font-semibold text-pink-500">Video Link</label>
            <input
              id="videoLink"
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter the URL of your video"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white text-lg font-medium"
            >
              Create Reel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingPage;
