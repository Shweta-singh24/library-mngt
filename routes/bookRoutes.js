import express from "express";
import { addBook, getAllBooks, getBookById, updateBook, deleteBook, checkAvailability, searchBooks } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// public (student + admin)
router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, getBookById);
router.get("/:id/availability", authMiddleware, checkAvailability);
router.get("/search", authMiddleware, searchBooks);

// admin only
router.post("/", authMiddleware, roleMiddleware("admin"), addBook);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateBook);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteBook);

export default router;
