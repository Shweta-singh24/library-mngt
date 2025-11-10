import Borrow from "../models/borrowModel.js";
import Book from "../models/bookModel.js";

/**
 * 🟩 Borrow a book (Student)
 * Route: POST /api/borrow/:bookId
 */
export const borrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Check if user already borrowed same book and hasn't returned
    const alreadyBorrowed = await Borrow.findOne({
      user: userId,
      book: bookId,
      isReturned: false,
    });

    if (alreadyBorrowed) {
      return res.status(400).json({ message: "You already borrowed this book" });
    }

    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 14); // 14 days due

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowDate,
      returnDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🟥 Return a book (Student)
 * Route: POST /api/borrow/return/:borrowId
 */
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId).populate("book");

    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });
    if (borrow.isReturned) return res.status(400).json({ message: "Book already returned" });

    // Calculate fine
    const now = new Date();
    const dueDate = borrow.returnDate;
    const daysLate = Math.max(0, Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * 10; // ₹10 per day late

    borrow.isReturned = true;
    borrow.fine = fine;
    borrow.actualReturnDate = now;
    await borrow.save();

    // Update book stock
    const book = borrow.book;
    book.availableCopies += 1;
    await book.save();

    res.json({
      message: "Book returned successfully",
      fine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🟨 Get all borrowed books (Admin)
 * Route: GET /api/borrow/all
 */
export const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("user", "name email")
      .populate("book", "title author category")
      .sort({ createdAt: -1 });

    res.json({ total: borrows.length, borrows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🟦 Get logged-in student's borrowed books
 * Route: GET /api/borrow/my
 */
export const getMyBorrows = async (req, res) => {
  try {
    const userId = req.user._id;
    const myBorrows = await Borrow.find({ user: userId })
      .populate("book", "title author category")
      .sort({ createdAt: -1 });

    res.json({ total: myBorrows.length, myBorrows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};