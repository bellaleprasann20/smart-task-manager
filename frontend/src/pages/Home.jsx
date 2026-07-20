import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      
      {/* Subtle Background Glow Effect */}
      <div className="absolute inset-0 max-w-lg m-auto w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-700 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Version 2.0 is live
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Control your workday with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            Smart Task Manager
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Organize your tasks, track priorities, and stay on top of deadlines — all in one beautifully simple workspace designed for modern teams and individuals.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-[0.98]"
            >
              Go to Dashboard
              <svg className="w-5 h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-[0.98]"
              >
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="text-base font-semibold leading-6 text-gray-900 transition-colors hover:text-indigo-600"
              >
                Log in <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;