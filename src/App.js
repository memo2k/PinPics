import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Create = lazy(() => import("./components/Create"));
const PostDetails = lazy(() => import("./components/PostDetails"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
      <AuthContextProvider>
        <div className="wrapper">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
              <Route path="/details/:postId" element={<PostDetails />} />
            </Routes>
          </Suspense>
        </div>
      </AuthContextProvider>
  )
}

export default App