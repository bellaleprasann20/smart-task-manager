/**
 * @file validation.js
 * Utility functions for client-side data validation.
 */

/**
 * Validates an email address format using a standard regular expression.
 * 
 * @param {string} email - The email string to validate
 * @returns {boolean} True if the email format is valid
 */
export const isValidEmail = (email) => {
  if (typeof email !== "string" || !email) return false;
  // Standard regex for basic email structure: string@string.string
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

/**
 * Checks if a password meets minimum security requirements.
 * Upgraded to require at least 8 characters and at least one number.
 * 
 * @param {string} password - The password string to check
 * @returns {boolean} True if the password is strong
 */
export const isStrongPassword = (password) => {
  if (typeof password !== "string" || !password) return false;
  
  const hasMinimumLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  
  return hasMinimumLength && hasNumber;
};

/**
 * Validates a task form payload before submission.
 * 
 * @param {Object} form - The task data object
 * @param {string} form.title - The title of the task
 * @param {string} [form.description] - The optional description
 * @returns {Object} An object containing error messages mapped by field name. Empty if valid.
 */
export const validateTaskForm = (form) => {
  const errors = {};

  // Safeguard against missing form object
  if (!form) {
    errors.general = "Form data is missing";
    return errors;
  }

  // Title Validation
  if (!form.title || typeof form.title !== "string" || !form.title.trim()) {
    errors.title = "Title is required";
  } else if (form.title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  // Description Validation (Optional field, but validate if present)
  if (form.description && typeof form.description === "string" && form.description.trim().length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  return errors;
};