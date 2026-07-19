import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc  Admin dashboard summary stats
// @route GET /api/admin/dashboard
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalTasks, completedTasks, pendingTasks] = await Promise.all([
    User.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: "completed" }),
    Task.countDocuments({ status: "pending" }),
  ]);

  res.json({ totalUsers, totalTasks, completedTasks, pendingTasks });
});

// @desc  Get all users
// @route GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// @desc  Delete a user
// @route DELETE /api/admin/user/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Also clean up that user's tasks so they don't become orphaned
  await Task.deleteMany({ createdBy: req.params.id });
  res.json({ message: "User and their tasks deleted" });
});

// @desc  Get all tasks across all users
// @route GET /api/admin/tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("createdBy", "name email");
  res.json(tasks);
});