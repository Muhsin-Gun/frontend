import React, { createContext, useState } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        { email, password }
      );

      const token = response.data.accessToken;
      if (typeof token === "string") {
        setIsAuthenticated(true);
        sessionStorage.setItem("accessToken", token);
        onSuccess(); // navigate passed from component
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed: An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate) => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");
    navigate("/"); // navigate passed from component
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
