import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './container/Home';

const App = () => {
  return (
    <div className="wrapper">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  )
}

export default App