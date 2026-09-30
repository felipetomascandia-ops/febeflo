'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types/user';
import { authService, type RegisterInput } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (email: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to get current user:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message || 'Error de inicio de sesión');
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (input: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const registeredUser = await authService.register(input);
      setUser(registeredUser);
    } catch (err: any) {
      setError(err.message || 'Error de registro');
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedInUser = await authService.loginWithGoogle(email);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message || 'No pudimos validar tu cuenta de Google');
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
