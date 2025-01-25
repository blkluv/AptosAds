import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const Reel = ({ videoSrc, title, description, likes, views, shares }) => {
  return (
    <div className="relative flex h-screen w-screen p-2 bg-green-00">
      {/* Video Section */}
      <div className="flex flex-col w-[50vw] h-full bg-red-00">
        <video
          className="object-cover w-[50vw] h-[70%] rounded-br-[35px] rounded-lg"
          src={videoSrc}
          autoPlay
          loop
          muted
        ></video>
        <div className="flex pt-3 h-[30%] items-center justify-evenly">
          <button className="w-[40%] h-[10vh] font-light bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#111111] rounded-xl text-xl text-[#fff] border border-[#ffffff39]">
            Viral
          </button>
          <button className="w-[40%] h-[10vh] font-light bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#111111] rounded-xl text-xl text-[#fff] border border-[#ffffff55]">
            Not Viral
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="h-full w-[45vw] flex flex-col gap-3 bg-red-00 p-4 text-white">
        {/* Title - Truncated to 2 lines */}
        <h1 className="text-2xl font-bold line-clamp-2">{title}</h1>

        {/* Description - Clamp to 5 lines and make it scrollable */}
        <p className="text-lg text-gray-300 line-clamp-5 overflow-auto">
          {description}
        </p>

        {/* Like, Comment, Share Buttons with counts */}
        <div className="p-4 flex justify-start">
          <div className="flex flex-col gap-4 items-center text-white">
            {/* Like Button with Likes Count */}
            <div className="flex flex-col items-center">
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <FaHeart size={24} />
              </button>
              <span className="text-sm mt-2">{likes} Likes</span>
            </div>

            {/* Comment Button with Comments Count */}
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
      </div>
    </div>
  );
};

export default Reel;
