
import { useEffect } from 'react';
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
import { GetInventoryQuery, GetInventoryVariables } from '@/types/graphql';
import { inventoryClient } from '@/lib/apollo/inventoryClient';

const LibraryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to browse if user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const { data, loading, error, refetch } = useQuery<GetInventoryQuery, GetInventoryVariables>(
    GET_INVENTORY,
    {
      client: inventoryClient,
      variables: { userId: user?.id || '' },
      skip: !user?.id,
      errorPolicy: 'all'
    }
  );

  const handleRetry = () => {
    refetch();
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <LibraryHeader />

          {loading && <LibraryLoadingSkeleton />}

          {error && !loading && (
            <LibraryErrorState onRetry={handleRetry} />
          )}

          {data && !loading && !error && (
            <>
              {data.getInventory.length === 0 ? (
                <EmptyLibrary />
              ) : (
                <>
                  <div className="mb-6 animate-fade-in">
                    <p className="text-gray-400 text-lg">
                      {data.getInventory.length} {data.getInventory.length === 1 ? 'game' : 'games'} in your library
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.getInventory.map((game, index) => (
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
