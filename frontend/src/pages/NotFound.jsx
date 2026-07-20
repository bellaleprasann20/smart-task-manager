import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-24 text-center bg-white sm:py-32 lg:px-8">
      
      {/* 404 Label */}
      <p className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
        404 Error
      </p>
      
      {/* Headline */}
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      
      {/* Subtitle */}
      <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or it never existed in the first place.
      </p>
      
      {/* Action Buttons */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-[0.98]"
        >
          Go back home
        </Link>
        
        {/* Optional secondary link, you can change this to /dashboard or remove if unneeded */}
        <Link 
          to="/dashboard" 
          className="text-sm font-semibold text-gray-900 transition-colors hover:text-indigo-600"
        >
          Go to Dashboard <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      
    </div>
  );
};

export default NotFound;