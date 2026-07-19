import { useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm.jsx";
import { taskService } from "../services/taskService.js";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await taskService.create(form);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Task</h1>
      <TaskForm onSubmit={handleSubmit} onCancel={() => navigate("/dashboard")} />
    </div>
  );
};

export default CreateTask;