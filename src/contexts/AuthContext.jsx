import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ email, role, name: email.split('@')[0] });
      setLoading(false);
    }, 1000);
  };

  const register = async (userData) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ ...userData });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
