import React, { useState } from "react";
import {
  Search,
  Trophy,
  ImagePlus,
  TrendingUp,
  Heart,
  LucideXCircle,
  CheckCircle2Icon,
} from "lucide-react";
import { MemesGrid } from "../components/MemeGrid";
import { BetsGrid } from "../components/BetsGrid";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("memes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [betStatusFilter, setBetStatusFilter] = useState("all");

  const userData = {
    username: "lolcatz",
    totalBetsWon: 2,
    totalBetsLost: 1,
    totalAmount: 2500,
    memesPosted: 3,
    memes: [
      {
        id: 1,
        title: "Web3 Problems",
        likes: 234,
        date: "2024-01-28",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSHffAqYqYsZhUL2N4-AUiXQaqF_j0i4DgQ&s",
      },
      {
        id: 2,
        title: "DeFi Drama",
        likes: 456,
        date: "2024-01-27",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRApZ1TShZS6pLdOfZ6JMd5dTzG0VPaG5BGwg&s",
      },
      {
        id: 3,
        title: "NFT Life",
        likes: 789,
        date: "2024-01-26",
        image:
          "https://indianmemetemplates.com/wp-content/uploads/abhi-maza-ayega-na-bhidu.jpg",
      },
    ],
    bets: [
      {
        id: 1,
        amount: 100,
        choice: "viral",
        status: "won",
        date: "2024-01-28",
        memeTitle: "Web3 Problems",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIaAq28U6EHpm7IIz-TjWYF9Fy0eKsilsKg&s",
      },
      {
        id: 2,
        amount: 50,
        choice: "non-viral",
        status: "lost",
        date: "2024-01-27",
        memeTitle: "DeFi Drama",
        image: "https://pbs.twimg.com/media/EX4CyEzWsAIbzLn.jpg",
      },
      {
        id: 3,
        amount: 75,
        choice: "viral",
        status: "in-progress",
        date: "2024-01-26",
        memeTitle: "NFT Life",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWqXFjKjgCdrTLfl2fr8PnedFyzHhHhvXSQ&s",
      },
    ],
  };

  const filteredMemes = userData.memes
    .filter((meme) =>
      meme.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (activeFilter === "latest") return new Date(b.date) - new Date(a.date);
      if (activeFilter === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const filteredBets = userData.bets
    .filter(
      (bet) =>
        bet.memeTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (betStatusFilter === "all" || bet.status === betStatusFilter)
    )
    .sort((a, b) => {
      if (activeFilter === "latest") return new Date(b.date) - new Date(a.date);
      if (activeFilter === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="min-h-screen primary-font bg-gray-900 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Hello{" "}
          <span className="text-yellow-400 italic">{userData.username}</span>
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 flex justify-between gap-4 max-sm:flex-col max-sm:items-center">
          <div className="flex place-items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <p className="text-2xl font-bold text-yellow-400">
              ${userData.totalAmount}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="w-8 h-8 text-green-400" />
            <p className="text-green-400 text-2xl font-semibold">
              {userData.totalBetsWon} Won
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LucideXCircle className="w-8 h-8 text-red-400" />
            <p className="text-red-400 text-2xl font-semibold">
              {userData.totalBetsLost} Lost
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ImagePlus className="w-8 h-8 text-blue-400" />
            <p className="text-blue-400 text-2xl font-semibold">
              {userData.memesPosted} Memes
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {["all", "oldest", "latest"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex mb-6 gap-2">
        <button
          onClick={() => setActiveTab("memes")}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-lg ${
            activeTab === "memes"
              ? "text-gray-900 bg-yellow-400 "
              : "text-gray-100 bg-gray-500 hover:text-white"
          }`}
        >
          <ImagePlus className="w-4 h-4 mr-2" />
          My Memes
        </button>
        <button
          onClick={() => setActiveTab("bets")}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-lg ${
            activeTab === "bets"
              ? "text-gray-900 bg-yellow-400 "
              : "text-gray-100 bg-gray-500 hover:text-white"
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          My Bets
        </button>
      </div>

      {activeTab === "bets" && (
        <div className="flex gap-2 mb-4">
          {["all", "won", "lost", "in-progress"].map((status) => (
            <button
              key={status}
              onClick={() => setBetStatusFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                betStatusFilter === status
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      {activeTab === "memes" ? (
        <MemesGrid memes={filteredMemes} />
      ) : (
        <BetsGrid bets={filteredBets} />
      )}
    </div>
  );
};

export default UserDashboard;
