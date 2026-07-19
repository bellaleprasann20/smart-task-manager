import Task from "../models/Task.js";

// @desc  Get all tasks for logged-in user
// @route GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single task
// @route GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create task
// @route POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      category,
      priority,
      status,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update task
// @route PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete task
// @route DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Search tasks by title/description
// @route GET /api/tasks/search?q=keyword
export const searchTasks = async (req, res) => {
  try {
    const { q } = req.query;
    const tasks = await Task.find({
      createdBy: req.user._id,
      $or: [
        { title: { $regex: q || "", $options: "i" } },
        { description: { $regex: q || "", $options: "i" } },
      ],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Filter tasks by status/priority/category
// @route GET /api/tasks/filter?status=&priority=&category=
export const filterTasks = async (req, res) => {
  try {
    const { status, priority, category } = req.query;
    const filter = { createdBy: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};