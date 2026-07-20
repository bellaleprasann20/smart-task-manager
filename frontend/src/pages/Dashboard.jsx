import React, { useEffect, useState } from "react";
import api from "../services/api.js";

// Bringing in all your upgraded custom components!
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import SearchBar from "../components/tasks/SearchBar.jsx"; 
import TaskFilter from "../components/tasks/TaskFilter.jsx";
import TaskList from "../components/tasks/TaskList.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Added 'silent' parameter to prevent full-page loading spinners on background updates
  const fetchTasks = async (silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    
    try {
      let url = "/tasks";
      if (search) url = `/tasks/search?q=${encodeURIComponent(search)}`;
      else if (statusFilter) url = `/tasks/filter?status=${statusFilter}`;
      
      const { data } = await api.get(url);
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks. Please try refreshing.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  const handleSave = async (form) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
      } else {
        await api.post("/tasks", form);
      }
      setModalOpen(false);
      setEditingTask(null);
      // Silently refresh so the UI doesn't flicker
      fetchTasks(true);
    } catch (err) {
      console.error(err);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      // Optimistic update: remove instantly for snappy UX
      setTasks(prev => prev.filter(t => t._id !== id));
      await api.delete(`/tasks/${id}`);
      fetchTasks(true);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
      fetchTasks(true); // Restore the UI if delete failed
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Workspace</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your tasks and stay productive.</p>
        </div>
        <Button 
          variant="primary"
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          {/* Plus icon inside the button */}
          <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Task
        </Button>
      </div>

      {/* Responsive Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-indigo-600">{stats.total}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Total Tasks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-emerald-600">{stats.completed}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center transition-shadow hover:shadow-md">
          <p className="text-3xl font-black text-gray-700">{stats.pending}</p>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Pending</p>
        </div>
      </div>

      {/* Controls: Search and Filter using your custom components */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search your tasks..."
        />
        <TaskFilter 
          value={statusFilter} 
          onChange={setStatusFilter} 
        />
      </div>

      {error && (
        <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Reusable Task List handles the loading and empty states automatically */}
      <TaskList 
        tasks={tasks} 
        loading={loading} 
        onEdit={(t) => {
          setEditingTask(t);
          setModalOpen(true);
        }} 
        onDelete={handleDelete} 
      />

      {/* Task Creation/Editing Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>

    </div>
  );
};

export default Dashboard;