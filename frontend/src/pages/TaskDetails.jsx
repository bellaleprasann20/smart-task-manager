import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { taskService } from "../services/taskService.js";
import Loader from "../components/common/Loader.jsx";
import Button from "../components/common/Button.jsx";
import { formatDate } from "../utils/formatDate.js";
import { PRIORITY_COLORS, STATUS_COLORS } from "../utils/constants.js";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    taskService.getById(id)
      .then(setTask)
      .catch((err) => setError(err.response?.data?.message || "Task not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    await taskService.remove(id);
    navigate("/dashboard");
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to="/dashboard" className="text-indigo-600 text-sm">&larr; Back to dashboard</Link>
      <div className="bg-white rounded-lg shadow p-6 mt-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <span className={`text-xs px-2 py-1 rounded ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
        </div>
        <p className="text-gray-600">{task.description || "No description"}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Category: {task.category}</span>
          {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
        </div>
        <span className={`w-fit text-xs px-2 py-1 rounded ${STATUS_COLORS[task.status]}`}>{task.status}</span>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => navigate(`/tasks/${id}/edit`)}>Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;