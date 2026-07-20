import React from 'react';

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus:ring-indigo-500",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm focus:ring-indigo-500",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm focus:ring-red-500",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
};

const Button = ({ children, variant = "primary", className = "", ...props }) => (
  <button
    className={`
      inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 
      active:scale-[0.98]
      disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
      ${variants[variant]} 
      ${className}
    `.replace(/\s+/g, ' ').trim()}
    {...props}
  >
    {children}
  </button>
);

export default Button;