
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Search, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const BrowsePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Mock games data
  const games = [
    { id: 1, title: "Cyber Quest", price: "$59.99", rating: 4.8, image: "🎮" },
    { id: 2, title: "Space Adventure", price: "$49.99", rating: 4.6, image: "🚀" },
    { id: 3, title: "Fantasy Realm", price: "$39.99", rating: 4.9, image: "⚔️" },
    { id: 4, title: "Racing Thunder", price: "$29.99", rating: 4.5, image: "🏎️" },
    { id: 5, title: "Mystery Island", price: "$44.99", rating: 4.7, image: "🏝️" },
    { id: 6, title: "War Zone", price: "$54.99", rating: 4.4, image: "💥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-700">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Gam</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, {user?.firstName || user?.username}!</span>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-purple-400">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Browse Games</h1>
          <p className="text-gray-400">Discover your next favorite game</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search games..."
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-6xl mb-4 text-center">{game.image}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-400">{game.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 ml-1">{game.rating}</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
