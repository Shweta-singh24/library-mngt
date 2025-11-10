import Book from "../models/bookModel.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, category, totalCopies } = req.body;

    const newBook = await Book.create({
      title,
      author,
      category,
      totalCopies,
      availableCopies: totalCopies,
    });

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all book
export const getAllBooks = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: new RegExp(search, "i") },
          { author: new RegExp(search, "i") },
          { category: new RegExp(search, "i") },
        ],
      };
    }

    const books = await Book.find(query);
    res.json({ total: books.length, books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update book
export const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated", book: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get book by id 
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete
export const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//check book
export const checkAvailability = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const available = book.availableCopies > 0;
    res.json({ title: book.title, available, availableCopies: book.availableCopies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search
export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    // Case-insensitive search in multiple fields
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, "i") },
        { author: new RegExp(query, "i") },
        { category: new RegExp(query, "i") },
      ],
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json({ total: books.length, books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
