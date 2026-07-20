import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import Loader from "../components/common/Loader.jsx";
import { useAuth } from "../hooks/useAuth.js";

// 🚀 Performance Upgrade: Lazy Loading
// We only load the JavaScript for a page when the user actually navigates to it!
const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const CreateTask = lazy(() => import("../pages/CreateTask.jsx"));
const EditTask = lazy(() => import("../pages/EditTask.jsx"));
const TaskDetails = lazy(() => import("../pages/TaskDetails.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// 🔒 Security Upgrade: Admin-Only Wrapper
// Prevents standard users from typing "/admin" in the URL to access the dashboard
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.role !== "admin") {
    // Kicks non-admins back to their own dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    // Suspense catches the lazy-loaded components and shows the Loader while they download
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader size="lg" color="primary" />
        </div>
      }
    >
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Protected User Routes --- */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/tasks/new" 
          element={<ProtectedRoute><CreateTask /></ProtectedRoute>} 
        />
        <Route 
          path="/tasks/:id" 
          element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} 
        />
        <Route 
          path="/tasks/:id/edit" 
          element={<ProtectedRoute><EditTask /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />

        {/* --- Protected Admin Routes --- */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } 
        />

        {/* --- Catch-All --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;