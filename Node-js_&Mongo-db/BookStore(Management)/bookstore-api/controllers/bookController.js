const fs = require("fs");
const path = require("path");
const Book = require("../models/Book");
const Author = require("../models/Author");

const removeFile = (filePath) => {
  if (!filePath) return;
  fs.unlink(path.join(__dirname, "..", filePath), () => {});
};

// GET /api/books?search=&category=&minPrice=&maxPrice=&page=&limit=
exports.getBooks = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    const filter = {};
    if (search) filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const [books, total] = await Promise.all([
      Book.find(filter)
        .populate("author", "name nationality")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Book.countDocuments(filter),
    ]);

    res.json({
      success: true,
      page,
      pages: Math.ceil(total / limit),
      total,
      data: books,
    });
  } catch (err) { next(err); }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name nationality bio");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) { next(err); }
};

exports.createBook = async (req, res, next) => {
  try {
    const authorExists = await Author.exists({ _id: req.body.author });
    if (!authorExists) {
      if (req.file) removeFile(`uploads/${req.file.filename}`);
      return res.status(404).json({ success: false, message: "Author not found" });
    }

    const book = await Book.create({
      ...req.body,
      cover: req.file ? `uploads/${req.file.filename}` : null,
    });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    if (req.file) removeFile(`uploads/${req.file.filename}`);
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      if (req.file) removeFile(`uploads/${req.file.filename}`);
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (req.body.author && !(await Author.exists({ _id: req.body.author }))) {
      if (req.file) removeFile(`uploads/${req.file.filename}`);
      return res.status(404).json({ success: false, message: "Author not found" });
    }

    Object.assign(book, req.body);
    if (req.file) {
      removeFile(book.cover); // delete the old cover
      book.cover = `uploads/${req.file.filename}`;
    }
    await book.save();
    res.json({ success: true, data: book });
  } catch (err) {
    if (req.file) removeFile(`uploads/${req.file.filename}`);
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    removeFile(book.cover);
    res.json({ success: true, message: "Book deleted" });
  } catch (err) { next(err); }
};
