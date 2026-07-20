/**
 * @file constants.js
 * Global constants, configuration, and design tokens for the application.
 */

/**
 * Available task priority levels.
 * @constant {string[]}
 */
export const PRIORITY_OPTIONS = ["low", "medium", "high"];

/**
 * Available task statuses.
 * @constant {string[]}
 */
export const STATUS_OPTIONS = ["pending", "in-progress", "completed"];

/**
 * Tailwind CSS class mappings for task priorities.
 * Object.freeze prevents accidental mutations elsewhere in the app.
 * @constant {Object<string, string>}
 */
export const PRIORITY_COLORS = Object.freeze({
  low: "bg-green-50 text-green-700 border border-green-200",
  medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  high: "bg-red-50 text-red-700 border border-red-200",
});

/**
 * Tailwind CSS class mappings for task statuses.
 * Object.freeze prevents accidental mutations elsewhere in the app.
 * @constant {Object<string, string>}
 */
export const STATUS_COLORS = Object.freeze({
  pending: "bg-gray-50 text-gray-700 border border-gray-200",
  "in-progress": "bg-blue-50 text-blue-700 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
});

/**
 * Base URL for backend API requests.
 * Safely falls back to localhost if the environment variable is missing.
 * @constant {string}
 */
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";