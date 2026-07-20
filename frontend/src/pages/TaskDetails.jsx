import React, { useEffect, useState } from "react";
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
      .catch((err) => setError(err.response?.data?.message || "Task not found. It may have been deleted."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) return;
    
    try {
      await taskService.remove(id);
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to delete the task. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="inline-block p-6 bg-red-50 border border-red-100 rounded-xl">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Oops!</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => navigate("/dashboard")} variant="primary">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Back Navigation */}
      <Link 
        to="/dashboard" 
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="p-6 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {task.title}
            </h1>
            <span className={`shrink-0 inline-flex items-center text-xs px-3 py-1 rounded-full font-semibold border capitalize ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority} Priority
            </span>
          </div>

          {/* Description Section */}
          <div className="prose max-w-none mb-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Description
            </h3>
            {task.description ? (
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {task.description}
              </p>
            ) : (
              <p className="text-gray-400 italic">No description provided for this task.</p>
            )}
          </div>

          {/* Metadata Dashboard */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</span>
              <span className={`w-fit text-sm px-2.5 py-0.5 rounded-full font-medium border capitalize mt-1 ${STATUS_COLORS[task.status]}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-gray-900">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {task.category || "General"}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Due Date</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-gray-900">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.dueDate ? formatDate(task.dueDate) : "No due date"}
              </div>
            </div>
            
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3 justify-end items-center sm:px-8">
          <Button 
            variant="danger" 
            onClick={handleDelete}
            className="mr-auto sm:mr-0" // Pushes to the left on mobile, clusters right on desktop
          >
            Delete Task
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/tasks/${id}/edit`)}
          >
            Edit Task
          </Button>
        </div>

      </div>
    </div>
  );
};

export default TaskDetails;