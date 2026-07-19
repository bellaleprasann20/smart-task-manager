import TaskCard from "../TaskCard.jsx";
import Loader from "../Loader.jsx";

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) return <Loader />;
  if (!tasks.length) return <p className="text-gray-500 text-center py-10">No tasks found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;