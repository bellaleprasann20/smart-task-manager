import { useState, useEffect } from "react";
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" error={errors.title} />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border rounded px-3 py-2"
      />
      <Input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <select name="priority" value={form.priority} onChange={handleChange} className="border rounded px-3 py-2">
        {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2">
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      <div className="flex justify-end gap-2 mt-2">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TaskForm;