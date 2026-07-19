export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

export const validateTaskForm = (form) => {
  const errors = {};
  if (!form.title || !form.title.trim()) errors.title = "Title is required";
  return errors;
};