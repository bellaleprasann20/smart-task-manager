import { useEffect, useState } from "react";
import api from "../services/api.js";
import TaskCard from "../components/tasks/TaskCard.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";
import Modal from "../components/common/Modal.jsx";
import Loader from "../components/common/Loader.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let url = "/tasks";
      if (search) url = `/tasks/search?q=${encodeURIComponent(search)}`;
      else if (statusFilter) url = `/tasks/filter?status=${statusFilter}`;
      const { data } = await api.get(url);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + New Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-gray-500 text-sm">Total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
          <p className="text-gray-500 text-sm">Completed</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
          <p className="text-gray-500 text-sm">Pending</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => {
                setEditingTask(t);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "New Task"}
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