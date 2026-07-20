import React from "react";
import TaskCard from "./TaskCard.jsx";          // Fixed: Changed ../ to ./
import Loader from "../common/Loader.jsx";      // Fixed: Added common/ to path

    // Adjust path if needed

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  
  if (loading) {
    return (
      // Added a minimum height so the page doesn't collapse while loading
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" color="primary" />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 min-h-[300px]">
        {/* Empty Clipboard Icon */}
        <svg 
          className="w-12 h-12 text-gray-300 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm">
          You don't have any tasks matching this criteria. Try adjusting your filters or create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    // Increased gap-4 to gap-6 for better spacing between the new bordered cards
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;