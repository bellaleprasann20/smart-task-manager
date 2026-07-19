import api from "./api.js";

export const authService = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }).then((res) => res.data),

  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((res) => res.data),

  getProfile: () => api.get("/auth/profile").then((res) => res.data),

  updateProfile: (data) => api.put("/auth/profile", data).then((res) => res.data),

  changePassword: (currentPassword, newPassword) =>
    api.put("/auth/change-password", { currentPassword, newPassword }).then((res) => res.data),
};