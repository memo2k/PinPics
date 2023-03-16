import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import EditProfile from './components/Profile/EditProfile';
import RemoveAccount from './components/Profile/RemoveAccount';
import UserRoute from './components/UserRoute';
import { AuthContextProvider } from './context/AuthContext';
import PageNotFound from './pages/PageNotFound';

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
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserRoute><Login /></UserRoute>} />
              <Route path="/register" element={<UserRoute><Register /></UserRoute>} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/edit-profile/:userId" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
              <Route path="/remove-account/:postId" element={<ProtectedRoute><RemoveAccount /></ProtectedRoute>} />
              <Route path="/details/:postId" element={<PostDetails />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </div>
      </AuthContextProvider>
  )
}

export default App