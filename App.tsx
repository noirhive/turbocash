import React, { useState, useEffect } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Transactions from './src/pages/Transactions';
import Dashboard from './src/pages/Dashboard';
import Reports from './src/pages/Reports';
import Settings from './src/pages/Settings';
import NotFound from './src/pages/NotFound';

interface User {
  email: string;
  role: 'admin' | 'user';
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user session and theme preference
  useEffect(() => {
    const loadSession = async () => {
      try {
        // Load theme preference
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
          setDarkMode(JSON.parse(savedTheme));
        }

        // Load user session - replace with Supabase auth
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (email: string, role: 'admin' | 'user') => {
    const userData = { email, role };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Theme appearance={darkMode ? 'dark' : 'light'} radius="large" scaling="100%">
      <Router>
        <div className="min-h-screen font-inter">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/" replace /> : <Register />
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Transactions 
                    userEmail={user.email}
                    userRole={user.role}
                    onLogout={handleLogout}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard 
                    userEmail={user.email}
                    userRole={user.role}
                    onLogout={handleLogout}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/reports" 
              element={
                user ? (
                  <Reports 
                    userEmail={user.email}
                    userRole={user.role}
                    onLogout={handleLogout}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/settings" 
              element={
                user ? (
                  <Settings 
                    userEmail={user.email}
                    userRole={user.role}
                    onLogout={handleLogout}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme={darkMode ? 'dark' : 'light'}
          />
        </div>
      </Router>
    </Theme>
  );
};

export default App;