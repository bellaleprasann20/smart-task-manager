import React from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

// Helper function for the dynamic class string
const getLinkClass = ({ isActive }) => {
  const baseClass = "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1";
  const activeClass = "bg-indigo-50 text-indigo-700";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  
  return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-64px)] overflow-y-auto flex flex-col">
      <div className="p-4">
        {/* Optional Section Header */}
        <h3 className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Main Menu
        </h3>
        
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard" className={getLinkClass}>
            {/* Dashboard Icon */}
            <svg className="w-5 h-5 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </NavLink>

          <NavLink to="/tasks/new" className={getLinkClass}>
            {/* Plus Circle Icon */}
            <svg className="w-5 h-5 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            New Task
          </NavLink>

          <NavLink to="/profile" className={getLinkClass}>
            {/* User Profile Icon */}
            <svg className="w-5 h-5 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </NavLink>

          {user?.role === "admin" && (
            <>
              {/* Divider for Admin section */}
              <div className="my-2 border-t border-gray-100"></div>
              
              <NavLink to="/admin" className={getLinkClass}>
                {/* Shield Check Icon */}
                <svg className="w-5 h-5 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin Console
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;