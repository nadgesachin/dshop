import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config';
interface AuthContextType {
  isAuthenticated: boolean;
  authInitialized: boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  setIsAuthenticatedMethod: (isAuthenticated: boolean) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setAuthInitialized(true); // Mark as initialized no matter what
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${config.backendBaseUrl}/auth/login`, {
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      return token;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Authentication failed');
      }
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const setIsAuthenticatedMethod = (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, authInitialized, login, logout, setIsAuthenticatedMethod }}>
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