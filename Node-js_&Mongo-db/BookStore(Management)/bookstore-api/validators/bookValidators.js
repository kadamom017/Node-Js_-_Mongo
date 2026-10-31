const { body, param } = require("express-validator");

exports.idParam = [param("id").isMongoId().withMessage("Invalid book id")];

exports.createBook = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ min: 2, max: 200 }).withMessage("Title must be 2-200 characters"),
  body("author").notEmpty().withMessage("Author is required")
    .isMongoId().withMessage("Author must be a valid id"),
  body("price").notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("category").optional().trim().isString(),
  body("description").optional().trim().isLength({ max: 2000 }),
];

exports.updateBook = [
  ...exports.idParam,
  body("title").optional().trim().isLength({ min: 2, max: 200 }),
  body("author").optional().isMongoId().withMessage("Author must be a valid id"),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("category").optional().trim().isString(),
  body("description").optional().trim().isLength({ max: 2000 }),
];
