import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (accessToken && refreshToken) {
      setAuth({
        accessToken,
        refreshToken,
        user: user ? JSON.parse(user) : null,
      });
    }
    setLoading(false);
  }, []);

  const login = (userData, tokens) => {
    const newAuth = {
      user: userData,
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
    };
    setAuth(newAuth);
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth({ user: null, accessToken: null, refreshToken: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const value = {
    auth,
    setAuth,
    login,
    logout,
    loading,
    isAuthenticated: !!auth.accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
