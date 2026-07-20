import React from 'react';

const priorityStyles = {
  low: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-yellow-50 text-yellow-800 border-yellow-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

const statusStyles = {
  pending: "bg-gray-50 text-gray-700 border-gray-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col p-5 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      
      {/* Header: Title & Priority */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-bold leading-tight text-gray-900 line-clamp-2">
          {task.title}
        </h3>
        <span className={`shrink-0 text-xs px-2.5 py-0.5 rounded-full font-medium border capitalize ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Body: Description */}
      {task.description && (
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Footer: Metadata & Actions (Pushed to bottom using mt-auto) */}
      <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
        
        {/* Left Side: Status & Date */}
        <div className="flex flex-col gap-2">
          <span className={`inline-flex w-fit text-xs px-2.5 py-0.5 rounded-full font-medium border capitalize ${statusStyles[task.status]}`}>
            {task.status.replace("-", " ")}
          </span>
          
          {task.dueDate && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Edit task"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete task"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TaskCard;