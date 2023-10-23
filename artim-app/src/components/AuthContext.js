import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(""); // Add token state

  useEffect(() => {
    // Check if there's a saved session in local storage when the component mounts
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsLogged(true);
      setToken(savedToken);
    }
  }, []);

  const login = (userToken) => {
    setIsLogged(true);
    setToken(userToken);
    
    // Save the token to local storage
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setIsLogged(false);
    setToken("");
    
    // Remove the token from local storage
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
