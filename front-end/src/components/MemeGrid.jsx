import { Heart } from "lucide-react";

export const MemesGrid = ({ memes }) => {
    if (!memes.length) {
        return <div className="text-white text-center">No memes found</div>;
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <div key={meme.id} className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="aspect-video relative p-2">
            <img
              src={meme.image}
              alt={meme.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="text-white text-lg font-semibold mb-3">
              {meme.title}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">{meme.likes}</span>
              </div>
              <span className="text-gray-400">{meme.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
