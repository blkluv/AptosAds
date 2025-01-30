import React from "react";
import Player from "../components/Player";

const HomePage = () => {
  return (
    <div className="h-[90vh] w-screen relative">
    <div className="h-[90vh]  relative hide-scrollbar overflow-y-hidden flex justify-center bottom-0  text-yellow-400 ">
      <Player />
    </div>
    </div>
  );
};

export default HomePage;
