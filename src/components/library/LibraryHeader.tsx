
import { Library, BookOpen } from "lucide-react";

const LibraryHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="mb-6">
        <Library className="h-16 w-16 text-purple-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Your Game Library</h1>
        <p className="text-gray-400 text-lg">
          Your collection of owned games
        </p>
      </div>
    </div>
  );
};

export default LibraryHeader;
