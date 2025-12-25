// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get access token from localStorage
const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Helper function to get refresh token from localStorage
const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const loadUserFromStorage = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken || refreshToken) {
      // Load user data from localStorage
      const userId = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
      const userEmail = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
      const firstName = typeof window !== 'undefined' ? localStorage.getItem('firstName') : null;
      const lastName = typeof window !== 'undefined' ? localStorage.getItem('lastName') : null;
      const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

      if (userId || userEmail) {
        setUser({
          id: userId || '',
          email: userEmail || '',
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          role: role || undefined,
        });
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user) {
      const s = session as any;
      if (typeof window !== 'undefined') {
        if (s.user.id) localStorage.setItem("id", s.user.id);
        if (s.user.email) localStorage.setItem("email", s.user.email);
        if (s.user.name && !localStorage.getItem("firstName")) {
          const names = s.user.name.split(' ');
          localStorage.setItem("firstName", names[0] || "");
          localStorage.setItem("lastName", names.slice(1).join(' ') || "");
        }
        if (s.user.jwtToken) localStorage.setItem("access_token", s.user.jwtToken);
        if (s.user.role) localStorage.setItem("role", s.user.role);
      }
      loadUserFromStorage();
    }
  }, [session]);

  useEffect(() => {
    loadUserFromStorage();

    // Listen for storage changes (e.g., when login happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'refresh_token' || e.key === 'id' || e.key === 'email') {
        loadUserFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAuthenticated = !!user || !!(typeof window !== 'undefined' && getAccessToken());

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
