import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import api from "../services/api.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Added loading state for your ProtectedRoute!
  const [loading, setLoading] = useState(true);

  // Initialize auth state safely on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse user from storage, resetting.", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Memoize the value so consumers don't re-render unnecessarily
  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {/* Do not render the main app until we know if the user is logged in */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook with a built-in safety net
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};