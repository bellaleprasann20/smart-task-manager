import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService.js";

export const useTasks = ({ search = "", status = "" } = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Added a 'silent' parameter. If true, we don't trigger the loading spinner.
  const fetchTasks = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError("");
    
    try {
      let data;
      
      // Upgraded logic: It's usually best practice to pass both to a single 
      // endpoint so they can work together, e.g., taskService.getAll({ search, status })
      // But adhering strictly to your service structure:
      if (search && !status) {
        data = await taskService.search(search);
      } else if (status && !search) {
        data = await taskService.filter({ status });
      } else if (search && status) {
        // If your backend supports combining them:
        // data = await taskService.getAll({ search, status });
        // Fallback if backend doesn't support combined yet: fetch by status, then filter locally
        const filtered = await taskService.filter({ status });
        data = filtered.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
      } else {
        data = await taskService.getAll();
      }
      
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [search, status]);

  useEffect(() => {
    // Initial fetch always shows the loading spinner
    fetchTasks(false);
  }, [fetchTasks]);

  // Mutations now use try/catch and SILENTLY refetch the data
  const createTask = async (data) => {
    try {
      setError("");
      await taskService.create(data);
      await fetchTasks(true); // Refetch silently!
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      throw err; // Re-throw so the form can know it failed if needed
    }
  };

  const updateTask = async (id, data) => {
    try {
      setError("");
      await taskService.update(id, data);
      await fetchTasks(true); // Refetch silently!
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      await taskService.remove(id);
      await fetchTasks(true); // Refetch silently!
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
      throw err;
    }
  };

  return { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    createTask, 
    updateTask, 
    deleteTask 
  };
};