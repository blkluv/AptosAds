import React, { useState, useRef, useEffect } from "react";
import Reel from "../components/Reel";

const Player = () => {
  // List of video data for the reels
  const reelsData = [
    {
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Amazing Video 1",
      description: "This is an amazing video description 1.",
      likes: 120,
      views: 1500,
      shares: 300,
    },
    {
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
      title: "Amazing Video 2",
      description: "This is an amazing video description 2.",
      likes: 150,
      views: 2000,
      shares: 350,
    },
    {
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Amazing Video 3",
      description: "This is an amazing video description 3.",
      likes: 180,
      views: 2500,
      shares: 400,
    },
    // Add more reels here as needed
  ];

  const [currentReel, setCurrentReel] = useState(0); // State to track the current reel
  const containerRef = useRef(null); // Ref for the container holding all reels
  const reelHeight = 600; // Height of each reel (adjust as necessary)

  // Function to handle scroll and change the reel index
  const handleScroll = () => {
    const scrollPosition = containerRef.current.scrollTop;
    const newReelIndex = Math.round(scrollPosition / reelHeight);

    if (newReelIndex !== currentReel) {
      setCurrentReel(newReelIndex);
    }
  };

  useEffect(() => {
    // Adding event listener for scroll
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener
      container.removeEventListener("scroll", handleScroll);
    };
  }, [currentReel]); // Re-run the effect when the current reel changes

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gray-900 text-pink-500 font-pixel"
    >
      {/* Dynamically render reels */}
      <div className="w-full h-full flex flex-col">
        {reelsData.map((reel, index) => (
          <div
            key={index}
            className={`w-full h-screen snap-start transition-transform duration-300 ${
              index === currentReel ? "opacity-100" : "opacity-0"
            }`}
          >
            <Reel
              videoSrc={reel.videoSrc}
              title={reel.title}
              description={reel.description}
              likes={reel.likes}
              views={reel.views}
              shares={reel.shares}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
