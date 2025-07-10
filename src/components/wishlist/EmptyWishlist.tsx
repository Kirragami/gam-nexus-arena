
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface EmptyWishlistProps {
  onBrowseClick: () => void;
}

const EmptyWishlist = ({ onBrowseClick }: EmptyWishlistProps) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
      <p className="text-gray-400 mb-6 text-lg">
        Discover amazing games and add them to your wishlist!
      </p>
      <Button 
        onClick={onBrowseClick}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
      >
        Browse Games
      </Button>
    </div>
  );
};

export default EmptyWishlist;
