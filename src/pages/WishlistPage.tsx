
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Gamepad2, AlertCircle } from "lucide-react";
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
import WishlistHeader from "@/components/wishlist/WishlistHeader";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import WishlistGameCard from "@/components/wishlist/WishlistGameCard";
import WishlistLoadingSkeleton from "@/components/wishlist/WishlistLoadingSkeleton";
import WishlistErrorState from "@/components/wishlist/WishlistErrorState";

const WishlistPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [wishlistGames, setWishlistGames] = useState<Game[]>([]);

  const { data: wishlistData, loading: wishlistLoading, error: wishlistError } = useQuery<GetWishlistQuery, GetWishlistVariables>(
    GET_WISHLIST,
    {
      client: wishlistClient,
      variables: { userId: user?.id! },
      skip: !user?.id,
      errorPolicy: 'all',
      pollInterval: 5000
    }
  );

  const gameIds = wishlistData?.getWishlist?.map(item => item.gameId) || [];

  const { data: gamesData, loading: gamesLoading, error: gamesError } = useQuery<GetGamesQuery, GetGamesVariables>(
    GET_GAMES,
    {
      client: gameClient,
      variables: { limit: 100 },
      skip: gameIds.length === 0,
      errorPolicy: 'all'
    }
  );

  useEffect(() => {
    if (gamesData?.games?.items && gameIds.length > 0) {
      const filteredGames = gamesData.games.items.filter(game => 
        gameIds.includes(game.id)
      );
      setWishlistGames(filteredGames);
    } else {
      setWishlistGames([]);
    }
  }, [gamesData, gameIds]);

  const handlePurchase = (game: Game) => {
    console.log('Purchase game:', game.title);
    // Handle purchase logic here
  };

  const handleBackToBrowse = () => {
    navigate('/browse');
  };

  const loading = wishlistLoading || gamesLoading;
  const hasError = wishlistError || gamesError;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
          <p className="text-gray-400 mb-4">Please log in to view your wishlist.</p>
          <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <WishlistLoadingSkeleton />;
  }

  if (hasError) {
    return (
      <WishlistErrorState 
        user={user}
        onLogout={logout}
        onRetry={() => window.location.reload()}
      />
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
        <WishlistHeader 
          gameCount={wishlistGames.length}
          onBackClick={handleBackToBrowse}
        />

        {wishlistGames.length === 0 ? (
          <EmptyWishlist onBrowseClick={handleBackToBrowse} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistGames.map((game, index) => (
              <WishlistGameCard
                key={game.id}
                game={game}
                userId={user.id}
                index={index}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
