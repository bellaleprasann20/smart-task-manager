import React from 'react';
import { STATUS_OPTIONS } from "../../utils/constants.js";

// Helper to make raw status strings look great in the UI (e.g., "in-progress" -> "In Progress")
const formatStatusLabel = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const TaskFilter = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative min-w-[160px] ${className}`}>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pl-3 pr-10 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {formatStatusLabel(status)}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Chevron Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </div>
  );
};

export default TaskFilter;