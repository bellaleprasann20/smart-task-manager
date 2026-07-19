export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Converts a date to yyyy-mm-dd for <input type="date">
export const toInputDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
};