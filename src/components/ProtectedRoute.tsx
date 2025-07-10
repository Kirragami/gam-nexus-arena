import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, LogIn } from 'lucide-react';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  fallback?: ReactNode;
}

const ProtectedRoute = ({ children, requireAuth = true, fallback }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
        </div>
      </Layout>
    );
  }

  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="bg-slate-800/80 backdrop-blur-xl border-purple-500/20 shadow-2xl max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Lock className="h-12 w-12 text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Authentication Required</CardTitle>
              <p className="text-gray-400">Please sign in to access this page</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/login" state={{ from: location }} replace>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 