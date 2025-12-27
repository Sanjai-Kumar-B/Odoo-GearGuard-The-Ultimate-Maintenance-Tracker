import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('gearguard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: '1',
      email,
      companyName: 'My Company (San Francisco)',
      role: 'admin',
    };
    setUser(mockUser);
    localStorage.setItem('gearguard_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const signup = (companyName, email, password) => {
    // Mock signup
    const newUser = {
      id: Date.now().toString(),
      email,
      companyName,
      role: 'admin',
    };
    setUser(newUser);
    localStorage.setItem('gearguard_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gearguard_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
