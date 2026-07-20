import React, { useState, useEffect } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../utils/constants.js";
import { toInputDate } from "../../utils/formatDate.js";
import { validateTaskForm } from "../../utils/validators.js";

const emptyTask = {
  title: "",
  description: "",
  category: "General",
  priority: "medium",
  status: "pending",
  dueDate: "",
};

// Helper to make raw strings look great in the UI
const formatLabel = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const TaskForm = ({ initialTask, onSubmit, onCancel }) => {
  const [form, setForm] = useState(emptyTask);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialTask ? { ...initialTask, dueDate: toInputDate(initialTask.dueDate) } : emptyTask);
  }, [initialTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  // Shared classes to make standard HTML elements look exactly like your upgraded <Input>
  const sharedInputClasses = "block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm transition-all duration-200 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* Full Width Field */}
      <Input 
        label="Task Title"
        name="title" 
        value={form.title} 
        onChange={handleChange} 
        placeholder="e.g., Update user dashboard" 
        error={errors.title} 
      />

      {/* Full Width Textarea */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add some details about this task..."
          rows="3"
          className={`${sharedInputClasses} resize-y`}
        />
      </div>

      {/* 2-Column Grid for shorter fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input 
          label="Category"
          name="category" 
          value={form.category} 
          onChange={handleChange} 
          placeholder="e.g., Development" 
        />

        <Input 
          label="Due Date"
          type="date" 
          name="dueDate" 
          value={form.dueDate} 
          onChange={handleChange} 
        />

        {/* Priority Select */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="relative">
            <select 
              name="priority" 
              value={form.priority} 
              onChange={handleChange} 
              className={`${sharedInputClasses} appearance-none cursor-pointer pr-10`}
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{formatLabel(p)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Select */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="relative">
            <select 
              name="status" 
              value={form.status} 
              onChange={handleChange} 
              className={`${sharedInputClasses} appearance-none cursor-pointer pr-10`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{formatLabel(s)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {initialTask ? "Update Task" : "Create Task"}
        </Button>
      </div>
      
    </form>
  );
};

export default TaskForm;