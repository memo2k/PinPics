import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './container/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
      <AuthContextProvider>
        <div className="wrapper">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthContextProvider>
  )
}

export default App