const { body, param } = require("express-validator");

exports.idParam = [param("id").isMongoId().withMessage("Invalid author id")];

exports.createAuthor = [
  body("name").trim().notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters"),
  body("nationality").optional().trim().isString(),
  body("bio").optional().trim().isLength({ max: 1000 }).withMessage("Bio max 1000 characters"),
];

exports.updateAuthor = [
  ...exports.idParam,
  body("name").optional().trim().isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters"),
  body("nationality").optional().trim().isString(),
  body("bio").optional().trim().isLength({ max: 1000 }),
];
