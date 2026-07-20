import axios from "axios";

const api = axios.create({
  // Fallback to localhost if the env variable is missing
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 seconds timeout to prevent infinite loading
  headers: {
    "Content-Type": "application/json",
  },
});

// ⬆️ Request Interceptor: Attach token to outgoing requests
api.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ⬇️ Response Interceptor: Global error handling
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, just pass it through
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized (Expired or Invalid Token)
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or unauthorized. Logging out...");
      
      // Clear the invalid user data
      localStorage.removeItem("user");
      
      // Force a redirect to the login page (only if they aren't already there)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;