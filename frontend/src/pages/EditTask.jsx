import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm.jsx";
import { taskService } from "../services/taskService.js";
import Loader from "../components/common/Loader.jsx";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      try {
        const data = await taskService.getById(id);
        setTask(data);
      } catch (err) {
        setFetchError("Failed to load task. It may have been deleted or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    };
    
    loadTask();
  }, [id]);

  const handleSubmit = async (form) => {
    setSubmitError("");
    try {
      await taskService.update(id, form);
      navigate(`/tasks/${id}`);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to update task. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" color="primary" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="inline-block p-6 bg-red-50 border border-red-100 rounded-xl">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Oops!</h2>
          <p className="text-red-600 mb-4">{fetchError}</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-red-700 hover:text-red-800 underline underline-offset-2"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Back Navigation */}
      <button 
        onClick={() => navigate(`/tasks/${id}`)}
        className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Task Details
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
        <p className="mt-1 text-sm text-gray-500">
          Make changes to your task details below.
        </p>
      </div>

      {/* Submit Error Message Alert */}
      {submitError && (
        <div className="p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50" role="alert">
          {submitError}
        </div>
      )}

      {/* Elevated Form Card */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm sm:p-8 rounded-xl">
        <TaskForm 
          initialTask={task} 
          onSubmit={handleSubmit} 
          onCancel={() => navigate(`/tasks/${id}`)} 
        />
      </div>
      
    </div>
  );
};

export default EditTask;