import React, { useId } from 'react';

const Input = ({ label, error, className = "", id, ...props }) => {
  // Auto-generate a unique ID if one isn't passed as a prop
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          block w-full px-3 py-2 text-sm text-gray-900 
          bg-white border rounded-md shadow-sm
          transition-all duration-200 ease-in-out
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed
          ${
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          } 
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      />
      
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;