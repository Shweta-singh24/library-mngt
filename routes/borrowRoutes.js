import express from "express";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
} from "../controllers/borrowController.js";
import authMiddleware  from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student routes
router.post("/:bookId", authMiddleware, roleMiddleware("student"), borrowBook);
router.post("/return/:borrowId", authMiddleware, roleMiddleware("student"), returnBook);
router.get("/my", authMiddleware, roleMiddleware("student"), getMyBorrows);

// Admin routes
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllBorrows);

export default router;
