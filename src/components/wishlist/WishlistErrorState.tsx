
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AlertCircle, Gamepad2 } from "lucide-react";
import { User } from "@/types/graphql";

interface WishlistErrorStateProps {
  user: User;
  onLogout: () => void;
  onRetry: () => void;
}

const WishlistErrorState = ({ user, onLogout, onRetry }: WishlistErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-700">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Gam</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
            Browse
          </Link>
          <span className="text-gray-300">Welcome, {user?.firstName || user?.username}!</span>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:text-purple-400">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-16">
          <AlertCircle className="h-24 w-24 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Failed to load wishlist</h2>
          <p className="text-gray-400 mb-6 text-lg">
            There was an error loading your wishlist. Please try again.
          </p>
          <Button 
            onClick={onRetry}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistErrorState;
