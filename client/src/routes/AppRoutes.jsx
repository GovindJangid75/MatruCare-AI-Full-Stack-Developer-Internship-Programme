import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Signup from '../pages/Signup';
import VerifyOTP from '../pages/VerifyOTP';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import NotFound from '../pages/NotFound';

const AppRoutes = ({ darkMode, toggleDarkMode }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <Contact />
          </MainLayout>
        }
      />

      {/* Auth Routes - Only accessible when not logged in */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Signup />
            </MainLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <VerifyOTP />
            </MainLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Login />
            </MainLayout>
          </PublicRoute>
        }
      />

      {/* Protected Routes - Only accessible when logged in */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <ProtectedRoute>
            <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Registration />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;