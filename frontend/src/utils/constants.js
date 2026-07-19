export const PRIORITY_OPTIONS = ["low", "medium", "high"];
export const STATUS_OPTIONS = ["pending", "in-progress", "completed"];

export const PRIORITY_COLORS = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export const STATUS_COLORS = {
  pending: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export const API_URL = import.meta.env.VITE_API_URL;