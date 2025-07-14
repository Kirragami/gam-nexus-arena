
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LibraryErrorStateProps {
  onRetry: () => void;
}

const LibraryErrorState = ({ onRetry }: LibraryErrorStateProps) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
      <h3 className="text-2xl font-semibold text-white mb-4">
        Unable to Load Library
      </h3>
      <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
        We couldn't load your game library. Please check your connection and try again.
      </p>
      <Button 
        onClick={onRetry}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
};

export default LibraryErrorState;
