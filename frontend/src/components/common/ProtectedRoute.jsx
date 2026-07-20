import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "./Loader"; // Make sure the path matches where you saved your new Loader!

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // A beautiful, full-screen loading state that prevents layout shifting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Loader size="lg" color="primary" centered={false} />
      </div>
    );
  }

  // If there's a user, render the protected content.
  // If not, redirect to login BUT remember where they were trying to go!
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;