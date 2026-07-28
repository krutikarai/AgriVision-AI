import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  joinedDate: string;
  farmSize?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    fullName: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (
    fullName: string,
    farmSize: string,
    location: string,
    avatarUrl?: string
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API = "http://localhost:8000/api/v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agri_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form,
      });

      if (!res.ok) {
        setIsLoading(false);
        return false;
      }

      const token = await res.json();

      localStorage.setItem("agri_token", token.access_token);

      const me = await fetch(`${API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (!me.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await me.json();

      const loggedUser: User = {
        id: String(data.id),
        email: data.email,
        fullName: data.full_name,
        avatarUrl: data.avatar_url,
        joinedDate: data.created_at ?? "",
        farmSize: data.farm_size,
        location: data.location,
      };

      localStorage.setItem("agri_user", JSON.stringify(loggedUser));
      setUser(loggedUser);

      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    email: string,
    fullName: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          full_name: fullName,
          password,
        }),
      });

      if (!res.ok) {
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);

      return await login(email, password);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("agri_user");
    localStorage.removeItem("agri_token");
    setUser(null);
  };

  const updateProfile = async (
    fullName: string,
    farmSize: string,
    location: string,
    avatarUrl?: string
  ): Promise<boolean> => {
    if (!user) return false;

    const updated = {
      ...user,
      fullName,
      farmSize,
      location,
      avatarUrl: avatarUrl || user.avatarUrl,
    };

    localStorage.setItem("agri_user", JSON.stringify(updated));
    setUser(updated);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};