const { body, validationResult } = require("express-validator");

const validateProductEdit = [
  body("name")
    .isString()
    .withMessage("Product name must be text.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .bail()
    .isLength({ min: 5, max: 30 })
    .withMessage("Product name must be 5–30 characters.")
    .bail()
    .matches(/^[\p{L} ]+$/u)
    .withMessage("Use letters and spaces only."),

  body("description")
    .isString()
    .withMessage("Description must be text.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .bail()
    .isLength({ min: 20, max: 200 })
    .withMessage("Description must be 20–200 characters."),

  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .bail()
    .isFloat({ min: 1, max: 999 })
    .withMessage("Price must be between 1 and 999.")
    .bail()
    .custom((value) => /^\d+(\.\d{1,2})?$/.test(String(value)))
    .withMessage("Price can have at most two decimal places."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .bail()
    .isInt({ min: 0, max: 999 })
    .withMessage("Quantity must be a whole number between 0 and 999."),

  body("origin")
    .isString()
    .withMessage("Origin must be text.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Origin is required.")
    .bail()
    .isLength({ min: 5, max: 30 })
    .withMessage("Origin must be 5–30 characters.")
    .bail()
    .matches(/^[\p{L} ]+$/u)
    .withMessage("Origin may contain letters and spaces only."),

  body("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .bail()
    .isInt({ min: 1, max: 999 })
    .withMessage("Weight must be a whole number between 1 and 999."),
];

function checkProductValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

module.exports = {
  validateProductEdit,
  checkProductValidation,
};
