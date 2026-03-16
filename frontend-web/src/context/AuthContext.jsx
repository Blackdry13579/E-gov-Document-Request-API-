import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('egov_token');
      if (token) {
        const result = await authService.getProfile();
        if (result.success) {
          setUser(result.data);
        } else {
          localStorage.removeItem('egov_token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Login action
  const login = async (credentials) => {
    setLoading(true);
    const result = await authService.login(credentials);
    if (result.success) {
      const { token, user: userData } = result.data;
      localStorage.setItem('egov_token', token);
      setUser(userData);
    }
    setLoading(false);
    return result;
  };

  // Register action
  const register = async (userData) => {
    setLoading(true);
    const result = await authService.register(userData);
    if (result.success) {
      const { token, user: registeredUser } = result.data;
      localStorage.setItem('egov_token', token);
      setUser(registeredUser);
    }
    setLoading(false);
    return result;
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('egov_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
