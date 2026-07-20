/**
 * @file formatDate.js
 * Utility functions for date manipulation and display formatting.
 */

/**
 * Formats a date string or Date object into a readable localized format (e.g., "Oct 25, 2026").
 * Safely handles invalid or missing dates without throwing errors.
 * 
 * @param {string|Date} date - The date value to format
 * @returns {string} The formatted date string, or an empty string if invalid
 */
export const formatDate = (date) => {
  if (!date) return "";
  
  const parsedDate = new Date(date);
  
  // Safety Check: Ensure the parsed date is actually valid
  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Converts a date to the "yyyy-mm-dd" format strictly required by HTML <input type="date">.
 * Safely handles invalid or missing dates to prevent RangeError crashes.
 * 
 * @param {string|Date} date - The date value to format
 * @returns {string} The formatted date string (yyyy-mm-dd), or an empty string if invalid
 */
export const toInputDate = (date) => {
  if (!date) return "";
  
  const parsedDate = new Date(date);
  
  // Safety Check: toISOString() will crash the app if the date object is invalid
  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
};