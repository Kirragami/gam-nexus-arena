
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import LibraryHeader from '@/components/library/LibraryHeader';
import LibraryGameCard from '@/components/library/LibraryGameCard';
import EmptyLibrary from '@/components/library/EmptyLibrary';
import LibraryLoadingSkeleton from '@/components/library/LibraryLoadingSkeleton';
import LibraryErrorState from '@/components/library/LibraryErrorState';
import { GET_INVENTORY } from '@/graphql/inventory';
import { GET_GAME_BY_ID } from '@/graphql/games';
import { GetInventoryQuery, GetInventoryVariables, GetGameQuery, GetGameVariables, Game } from '@/types/graphql';
import { inventoryClient } from '@/lib/apollo/inventoryClient';
import { gameClient } from '@/lib/apollo/gameClient';

const LibraryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  // Redirect to browse if user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const { data: inventoryData, loading: inventoryLoading, error: inventoryError, refetch } = useQuery<GetInventoryQuery, GetInventoryVariables>(
    GET_INVENTORY,
    {
      client: inventoryClient,
      variables: { userId: user?.id || '' },
      skip: !user?.id,
      errorPolicy: 'all',
      pollInterval: 5000
    }
  );

  useEffect(() => {
    if(user?.id) {
      refetch()
    }
  }, [location.pathname])

  // Fetch game details when inventory data is available
  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!inventoryData?.getInventory || inventoryData.getInventory.length === 0) {
        setGames([]);
        return;
      }

      setLoadingGames(true);
      const gamePromises = inventoryData.getInventory.map(async (item) => {
        try {
          const result = await gameClient.query<GetGameQuery, GetGameVariables>({
            query: GET_GAME_BY_ID,
            variables: { id: item.gameId },
            errorPolicy: 'all'
          });
          return result.data?.game;
        } catch (error) {
          console.error(`Failed to fetch game ${item.gameId}:`, error);
          return null;
        }
      });

      const gameResults = await Promise.all(gamePromises);
      const validGames = gameResults.filter((game): game is Game => game !== null);
      setGames(validGames);
      setLoadingGames(false);
    };

    fetchGameDetails();
  }, [inventoryData]);

  const handleRetry = () => {
    refetch();
  };

  const isLoading = inventoryLoading || loadingGames;
  const hasError = inventoryError && !inventoryLoading;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <LibraryHeader />

          {isLoading && <LibraryLoadingSkeleton />}

          {hasError && !isLoading && (
            <LibraryErrorState onRetry={handleRetry} />
          )}

          {!isLoading && !hasError && (
            <>
              {games.length === 0 ? (
                <EmptyLibrary />
              ) : (
                <>
                  <div className="mb-6 animate-fade-in">
                    <p className="text-gray-400 text-lg">
                      {games.length} {games.length === 1 ? 'game' : 'games'} in your library
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((game, index) => (
                      <div
                        key={game.id}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <LibraryGameCard game={game} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default LibraryPage;
