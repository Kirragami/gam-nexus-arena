
import { Library, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyLibrary = () => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="mb-8">
        <Library className="h-24 w-24 text-gray-600 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-white mb-4">
          Your Library is Empty
        </h3>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          You haven't purchased any games yet. Explore our collection and start building your gaming library!
        </p>
      </div>
      
      <Button 
        asChild 
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
      >
        <Link to="/browse">
          <ShoppingBag className="h-5 w-5 mr-2" />
          Browse Games
        </Link>
      </Button>
    </div>
  );
};

export default EmptyLibrary;
