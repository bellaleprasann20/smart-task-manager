import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm.jsx";
import { taskService } from "../services/taskService.js";
import Loader from "../components/common/Loader.jsx";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskService.getById(id).then(setTask).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    await taskService.update(id, form);
    navigate(`/tasks/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm initialTask={task} onSubmit={handleSubmit} onCancel={() => navigate(`/tasks/${id}`)} />
    </div>
  );
};

export default EditTask;