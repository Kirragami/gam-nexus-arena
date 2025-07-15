import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Star, AlertCircle, Gamepad2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "@/graphql/games";
import { GetGamesQuery, GetGamesVariables } from "@/types/graphql";
import { useState } from "react";
import { gameClient } from "@/lib/apollo/gameClient";
import Layout from "@/components/Layout";

const BrowsePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, loading, error, refetch } = useQuery<GetGamesQuery, GetGamesVariables>(GET_GAMES, {
    client: gameClient,
    variables: {
      limit: 12,
      offset: 0,
      search: search || undefined,
    },
    errorPolicy: 'all'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({
      limit: 12,
      offset: 0,
      search: search || undefined,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Browse Games</h1>
          <p className="text-gray-400">Discover your next favorite game</p>
        </div>

        {/* Search and Filter */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>
          <Button type="submit" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          {/* <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button> */}
        </form>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-16 mx-auto mb-4 bg-slate-700" />
                  <Skeleton className="h-6 mb-2 bg-slate-700" />
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-6 w-16 bg-slate-700" />
                    <Skeleton className="h-6 w-12 bg-slate-700" />
                  </div>
                  <Skeleton className="h-10 w-full bg-slate-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Failed to load games</h3>
            <p className="text-gray-400 mb-4">
              Unable to connect to the games service. Please try again later.
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Games Grid */}
        {data?.games?.items && data.games.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.games.items.map((game) => (
              <Card
                key={game.id}
                className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleGameClick(game.id)}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">
                    {game.imageUrl ? (
                      <div className="w-40 h-64 mx-auto flex items-center justify-center overflow-hidden rounded bg-gray-800">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-64 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
                        <Gamepad2 className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-400">{formatPrice(game.price)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300 ml-1">{game.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-1 text-xs bg-slate-700 text-gray-300 rounded">
                      {game.category}
                    </span>
                    {game.platforms.slice(0, 2).map((platform) => (
                      <span key={platform} className="px-2 py-1 text-xs bg-slate-700 text-gray-300 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameClick(game.id);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {data?.games?.items && data.games.items.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
            <p className="text-gray-400">
              {search ? "Try adjusting your search terms" : "No games available at the moment"}
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {data?.games && data.games.totalCount > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Showing {data.games.items.length} of {data.games.totalCount} games
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrowsePage;
