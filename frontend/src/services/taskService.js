import api from "./api.js";

/**
 * Task Service
 * Handles all API requests related to task management.
 */
export const taskService = {
  
  /**
   * Retrieve all tasks for the current user
   * @returns {Promise<Array>} List of tasks
   */
  getAll: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  /**
   * Retrieve a specific task by its ID
   * @param {string} id - The unique identifier of the task
   * @returns {Promise<Object>} The task data
   */
  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Create a new task
   * @param {Object} data - The task data (e.g., title, description, status)
   * @returns {Promise<Object>} The newly created task object
   */
  create: async (data) => {
    const response = await api.post("/tasks", data);
    return response.data;
  },

  /**
   * Update an existing task
   * @param {string} id - The unique identifier of the task to update
   * @param {Object} data - The updated task properties
   * @returns {Promise<Object>} The updated task object
   */
  update: async (id, data) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  /**
   * Delete a task
   * @param {string} id - The unique identifier of the task to delete
   * @returns {Promise<Object>} Confirmation message from the server
   */
  remove: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Search tasks using a text query
   * @param {string} query - The search string
   * @returns {Promise<Array>} List of tasks matching the search query
   */
  search: async (query) => {
    const response = await api.get(`/tasks/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Filter tasks based on specific criteria
   * @param {Object} params - Key-value pairs for filtering (e.g., { status: 'pending' })
   * @returns {Promise<Array>} List of filtered tasks
   */
  filter: async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await api.get(`/tasks/filter?${query}`);
    return response.data;
  },
  
};