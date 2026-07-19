import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
  filterTasks,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // all task routes require login

// IMPORTANT: /search and /filter must come before /:id,
// otherwise Express will treat "search"/"filter" as an :id param
router.get("/search", searchTasks);
router.get("/filter", filterTasks);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;