import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types/graphql';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '@/graphql/auth';
import { userClient } from '@/lib/apollo/userClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User, refreshTokenValue?: string) => void;
  logout: () => void;
  loading: boolean;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [logoutMutation] = useMutation(LOGOUT_USER, {
    client: userClient,
    onCompleted: () => {
      // Clear local storage and state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  });

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      // Implement refresh token logic here
      // For now, we'll just clear the session if refresh fails
      throw new Error('Refresh token expired');
    } catch (error) {
      // Clear all auth data on refresh failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      throw error;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            // Check if token is expired (you might want to decode JWT to check expiration)
            // For now, we'll assume the token is valid if it exists
          } catch (error) {
            console.error('Failed to parse user data:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((token: string, userData: User, refreshTokenValue?: string) => {
    localStorage.setItem('accessToken', token);
    if (refreshTokenValue) {
      localStorage.setItem('refreshToken', refreshTokenValue);
    }
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      // Attempt to logout on server if user is authenticated
      if (user) {
        await logoutMutation();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, [user, logoutMutation]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
