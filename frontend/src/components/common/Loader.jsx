import React from 'react';

const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
};

const colors = {
  primary: "border-indigo-100 border-t-indigo-600",
  gray: "border-gray-200 border-t-gray-600",
  white: "border-white/30 border-t-white", // Perfect for inside buttons
};

const Loader = ({ 
  size = "md", 
  color = "primary", 
  centered = true, // Set to false if you want to use it inline/inside a button
  className = "" 
}) => {
  const spinner = (
    <div 
      role="status"
      aria-label="Loading"
      className={`
        rounded-full animate-spin
        ${sizes[size]}
        ${colors[color]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* This text is hidden visually but read by screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );

  // If centered is true, wrap it in your original layout container
  if (centered) {
    return (
      <div className="flex justify-center items-center py-10 w-full">
        {spinner}
      </div>
    );
  }

  // Otherwise, just return the raw spinner for inline use
  return spinner;
};

export default Loader;