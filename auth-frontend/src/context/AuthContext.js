import React, { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await API.get('/user');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (formData) => {
    try {
      const res = await API.post('/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Register Error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  };

  const login = async (formData) => {
    try {
      const res = await API.post('/login', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};