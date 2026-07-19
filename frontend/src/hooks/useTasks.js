import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService.js";

export const useTasks = ({ search = "", status = "" } = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (search) data = await taskService.search(search);
      else if (status) data = await taskService.filter({ status });
      else data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data) => {
    await taskService.create(data);
    fetchTasks();
  };

  const updateTask = async (id, data) => {
    await taskService.update(id, data);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await taskService.remove(id);
    fetchTasks();
  };

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
};