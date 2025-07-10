
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft } from "lucide-react";

interface WishlistHeaderProps {
  gameCount: number;
  onBackClick: () => void;
}

const WishlistHeader = ({ gameCount, onBackClick }: WishlistHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={onBackClick}
          className="text-white hover:text-purple-400 hover:bg-slate-800/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
        </div>
      </div>
      <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
        {gameCount} Games
      </Badge>
    </div>
  );
};

export default WishlistHeader;
