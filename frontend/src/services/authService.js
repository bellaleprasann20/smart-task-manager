import api from "./api.js";

/**
 * Authentication Service
 * Handles all API requests related to user authentication and profile management.
 */
export const authService = {
  
  /**
   * Register a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's chosen password
   * @returns {Promise<Object>} The registered user data and authentication token
   */
  register: async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  /**
   * Log in an existing user
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} The logged-in user data and authentication token
   */
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  /**
   * Fetch the current authenticated user's profile
   * @returns {Promise<Object>} The user's profile data
   */
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  /**
   * Update the current user's profile details
   * @param {Object} data - The profile data to update (e.g., { name, email })
   * @returns {Promise<Object>} The updated user profile data
   */
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  /**
   * Change the current user's password
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The new password to set
   * @returns {Promise<Object>} Success message from the server
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/auth/change-password", { 
      currentPassword, 
      newPassword 
    });
    return response.data;
  }
  
};