
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  Star,
  ShoppingCart,
  Gamepad2,
  ArrowLeft,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { wishlistClient } from "@/lib/apollo/wishlistClient";
import { gameClient } from "@/lib/apollo/gameClient";
import { GET_WISHLIST } from "@/graphql/wishlist";
import { GET_GAMES } from "@/graphql/games";
import {
  GetWishlistQuery,
  GetWishlistVariables,
  GetGamesQuery,
  GetGamesVariables,
  Game
} from "@/types/graphql";
import WishlistButton from "@/components/WishlistButton";

const WishlistPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [wishlistGames, setWishlistGames] = useState<Game[]>([]);

  const { data: wishlistData, loading: wishlistLoading } = useQuery<GetWishlistQuery, GetWishlistVariables>(
    GET_WISHLIST,
    {
      client: wishlistClient,
      variables: { userId: user?.id! },
      skip: !user?.id,
      errorPolicy: 'all'
    }
  );

  const gameIds = wishlistData?.getWishlist.map(item => item.gameId) || [];

  const { data: gamesData, loading: gamesLoading } = useQuery<GetGamesQuery, GetGamesVariables>(
    GET_GAMES,
    {
      client: gameClient,
      variables: { limit: 50 },
      skip: gameIds.length === 0,
      errorPolicy: 'all'
    }
  );

  useEffect(() => {
    if (gamesData?.games.items && gameIds.length > 0) {
      const filteredGames = gamesData.games.items.filter(game => 
        gameIds.includes(game.id)
      );
      setWishlistGames(filteredGames);
    }
  }, [gamesData, gameIds]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const loading = wishlistLoading || gamesLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <Skeleton className="h-8 w-32 bg-slate-700" />
          <Skeleton className="h-8 w-24 bg-slate-700" />
        </nav>

        <div className="container mx-auto px-6 py-8">
          <Skeleton className="h-12 w-48 mb-8 bg-slate-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 bg-slate-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <Button variant="ghost" onClick={logout} className="text-white hover:text-purple-400">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
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
            {wishlistGames.length} Games
          </Badge>
        </div>

        {/* Wishlist Content */}
        {wishlistGames.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6 text-lg">
              Discover amazing games and add them to your wishlist!
            </p>
            <Button 
              onClick={() => navigate('/browse')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
            >
              Browse Games
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistGames.map((game, index) => (
              <Card 
                key={game.id} 
                className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Link to={`/game/${game.id}`}>
                      <img
                        src={game.imageUrl || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'}
                        alt={game.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="absolute top-4 right-4">
                      <WishlistButton
                        gameId={game.id}
                        userId={user?.id!}
                        gameTitle={game.title}
                        variant="icon"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Link to={`/game/${game.id}`}>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {game.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {game.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{game.rating.toFixed(1)}</span>
                      </div>
                      <Badge className="bg-purple-600 text-white">
                        {game.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-400">
                        {formatPrice(game.price)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
