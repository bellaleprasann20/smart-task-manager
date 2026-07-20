import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Side: Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500">
            <span>© {currentYear} Smart Task Manager.</span>
            <span className="hidden sm:inline-block text-gray-300">|</span>
            <span>All rights reserved.</span>
          </div>

          {/* Right Side: Tech Stack / Credits */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>Built with</span>
            {/* A nice touch of color for the heart */}
            <svg 
              className="w-4 h-4 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>using the</span>
            <span className="font-semibold text-gray-700 tracking-wide">MERN</span>
            <span>stack.</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;