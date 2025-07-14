import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = "" }: NavigationProps) => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <nav className={`container mx-auto px-6 py-4 flex justify-between items-center ${className}`}>
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Gam</span>
        </div>
        <div className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
      </nav>
    );
  }

  return (
    <>
      <nav className={`container mx-auto px-6 py-4 flex justify-between items-center ${className}`}>
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Gam</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
                  Browse
                </Link>
                <Link to="/library" className="text-gray-300 hover:text-white transition-colors">
                  Library
                </Link>
                <Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors">
                  Wishlist
                </Link>
                <span className="text-gray-300">
                  Welcome, {user?.firstName || user?.username}!
                </span>
                <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-purple-400">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white hover:text-purple-400">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-white hover:text-purple-400"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Gamepad2 className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">Gam</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-white hover:text-purple-400"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/browse"
                    className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Browse
                  </Link>
                  <Link
                    to="/library"
                    className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Library
                  </Link>
                  <Link
                    to="/wishlist"
                    className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-gray-400 mb-4">
                      Welcome, {user?.firstName || user?.username}!
                    </p>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="text-white hover:text-purple-400 w-full justify-start"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
