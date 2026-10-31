const Author = require("../models/Author");
const Book = require("../models/Book");

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json({ success: true, count: authors.length, data: authors });
  } catch (err) { next(err); }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, data: author });
  } catch (err) { next(err); }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({ success: true, data: author });
  } catch (err) { next(err); }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, data: author });
  } catch (err) { next(err); }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const hasBooks = await Book.exists({ author: req.params.id });
    if (hasBooks) {
      return res.status(409).json({ success: false, message: "Cannot delete an author who still has books" });
    }
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, message: "Author deleted" });
  } catch (err) { next(err); }
};
