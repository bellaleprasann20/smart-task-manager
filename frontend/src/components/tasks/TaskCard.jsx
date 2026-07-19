const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm">{task.description}</p>
      )}
      <div className="flex justify-between items-center mt-2">
        <span className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}>
          {task.status}
        </span>
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-indigo-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;