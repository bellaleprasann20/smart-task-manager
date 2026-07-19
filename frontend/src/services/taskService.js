import api from "./api.js";

export const taskService = {
  getAll: () => api.get("/tasks").then((res) => res.data),

  getById: (id) => api.get(`/tasks/${id}`).then((res) => res.data),

  create: (data) => api.post("/tasks", data).then((res) => res.data),

  update: (id, data) => api.put(`/tasks/${id}`, data).then((res) => res.data),

  remove: (id) => api.delete(`/tasks/${id}`).then((res) => res.data),

  search: (query) => api.get(`/tasks/search?q=${encodeURIComponent(query)}`).then((res) => res.data),

  filter: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/tasks/filter?${query}`).then((res) => res.data);
  },
};