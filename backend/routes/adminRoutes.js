import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllTasks,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly); // every route below requires a logged-in admin

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.get("/tasks", getAllTasks);

export default router;