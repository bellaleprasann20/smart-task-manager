import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm.jsx";
import { taskService } from "../services/taskService.js";

const CreateTask = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // Optional: You can pass this state to TaskForm to disable the submit button while saving
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (form) => {
    setError("");
    setIsSubmitting(true);
    
    try {
      await taskService.create(form);
      // On success, redirect back to the main view
      navigate("/dashboard");
    } catch (err) {
      // If it fails, capture the error from the backend and display it
      setError(err.response?.data?.message || "Failed to create task. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Back Navigation */}
      <button 
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new task to your workspace to stay organized.
        </p>
      </div>

      {/* Error Message Alert */}
      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50" role="alert">
          {error}
        </div>
      )}

      {/* Elevated Form Card */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm sm:p-8 rounded-xl">
        <TaskForm 
          onSubmit={handleSubmit} 
          onCancel={() => navigate("/dashboard")} 
        />
      </div>
      
    </div>
  );
};

export default CreateTask;