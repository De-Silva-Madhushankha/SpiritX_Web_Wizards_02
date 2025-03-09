// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlayerDetails from './pages/PlayerDetails';
import TournamentSummary from './pages/TournamentSummary';
import AddPlayer from './pages/AddPlayer';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import EditPlayer from './pages/EditPlayer';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen">
        {/* Parallax Background */}
        <div 
          className="fixed inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-fixed"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative min-h-screen">
          <Routes>
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onLogout={handleLogout} />
                    <Home />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onLogout={handleLogout} />
                    <PlayerDetails />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tournament-summary"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onLogout={handleLogout} />
                    <TournamentSummary />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-player"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onLogout={handleLogout} />
                    <AddPlayer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-player/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onLogout={handleLogout} />
                    <EditPlayer />
                  </>
                </ProtectedRoute>
              }
            />            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;