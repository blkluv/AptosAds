import React from "react";
import Player from "../components/Player";

const HomePage = () => {
  return (
    <div className="h-[calc(100vh-60px)] hide-scrollbar overflow-y-hidden flex items-center justify-center bg-gray-900 text-yellow-400 font-pixel">
      <Player />
    </div>
  );
};

export default HomePage;
