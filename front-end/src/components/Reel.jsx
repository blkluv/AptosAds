import React, { useState } from "react";
import { FaHeart, FaComment, FaShare, FaArrowDown } from "react-icons/fa";

const Reel = ({ videoSrc, title, description, likes, views, shares }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="relative flex flex-col h-screen w-[30vw] max-sm:w-[100vw]  bg-gray-900">
      {/* Video Section */}
      <div className="flex flex-col w-full h-[95%]">
        <video
          className="object-cover w-full h-full "
          src={videoSrc}
          autoPlay
          loop
          muted
        ></video>
      </div>

      {/* Description Drawer Section */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          drawerOpen ? "h-[50%]" : "h-[10%]"
        } bg-[#00000083] text-white p-4 absolute bottom-0 left-0 w-full rounded-t-2xl`}
      >
        {/* Title */}
        <h1
          className={`text-xl font-semibold text-white mb-2 ${
            drawerOpen ? "absolute top-2" : "relative"
          }`}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className={`text-base text-gray-300 transition-all duration-300 ease-in-out ${
            drawerOpen ? "h-[80%] mt-7 overflow-auto" : "h-0 overflow-hidden"
          }`}
        >
          {description}
        </p>

        {/* Arrow to toggle drawer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={toggleDrawer}
            className="bg-gray-700 text-white p-2 rounded-full"
          >
            <FaArrowDown size={20} className={`transform ${drawerOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Icons (Like, Comment, Share) */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4">
        {/* Like Button with Likes Count */}
        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <FaHeart size={24} />
          </button>
          <span className="text-sm mt-2">{likes} Likes</span>
        </div>

        {/* Comment Button with Views Count */}
        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <FaComment size={24} />
          </button>
          <span className="text-sm mt-2">{views} Views</span>
        </div>

        {/* Share Button with Shares Count */}
        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <FaShare size={24} />
          </button>
          <span className="text-sm mt-2">{shares} Shares</span>
        </div>
      </div>
    </div>
  );
};

export default Reel;
