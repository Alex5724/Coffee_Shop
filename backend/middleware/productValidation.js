const { body, param, query, validationResult } = require("express-validator");

const editableFields = [
  "name",
  "price",
  "description",
  "quantity",
  "origin",
  "roast_level",
  "format",
  "weight",
  "type",
  "caffeine_level",
];

const createFields = new Set(["category_id", ...editableFields]);
const editFields = new Set([...createFields, "id", "available"]);

function allowOnlyFields(allowedFields) {
  return body().custom((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("The request body must be a JSON object.");
    }

    if (Object.keys(value).some((key) => !allowedFields.has(key))) {
      throw new Error("The request contains unsupported fields.");
    }

    return true;
  });
}

const productFieldsValidation = [
  body("category_id")
    .isInt({ min: 1, max: 2 })
    .withMessage("Category must be 1 (Coffee) or 2 (Tea)."),
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
  body("format")
    .isIn(["Whole Bean", "Ground", "Loose leaf", "Tea bags"])
    .withMessage("Choose a valid product format."),
  body("roast_level")
    .optional({ nullable: true })
    .isIn(["Light", "Medium", "Dark"])
    .withMessage("Choose a valid roast level."),
  body("type")
    .optional({ nullable: true })
    .isIn(["Green", "Black", "Herbal"])
    .withMessage("Choose a valid tea type."),
  body("caffeine_level")
    .optional({ nullable: true })
    .isIn(["None", "Medium", "High"])
    .withMessage("Choose a valid caffeine level."),
  body().custom((product) => {
    if (!product || typeof product !== "object" || Array.isArray(product)) {
      return true;
    }

    const hasValue = (key) =>
      product[key] !== undefined &&
      product[key] !== null &&
      product[key] !== "";

    if (Number(product.category_id) === 1) {
      if (!hasValue("roast_level")) {
        throw new Error("Roast level is required for coffee.");
      }
      if (hasValue("type") || hasValue("caffeine_level")) {
        throw new Error("Tea attributes are not valid for coffee.");
      }
    }

    if (Number(product.category_id) === 2) {
      if (!hasValue("type") || !hasValue("caffeine_level")) {
        throw new Error("Tea type and caffeine level are required for tea.");
      }
      if (hasValue("roast_level")) {
        throw new Error("Roast level is not valid for tea.");
      }
    }

    return true;
  }),
];

const validateProductCreate = [
  allowOnlyFields(createFields),
  ...productFieldsValidation,
];
const validateProductEdit = [
  allowOnlyFields(editFields),
  ...productFieldsValidation,
];

function validateId(parameterName, label) {
  return [
    param(parameterName)
      .isInt({ min: 1 })
      .withMessage(`${label} ID must be a positive integer.`),
  ];
}

const validateProductId = validateId("productId", "Product");
const validateProductRouteId = validateId("id", "Product");

const validateCategoryId = [
  param("categoryId")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer."),
];

const validateSearch = [
  query("search")
    .optional()
    .isString()
    .withMessage("Search must be text.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Search must be at most 100 characters."),
];

function checkProductValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Invalid request",
      details: errors
        .array()
        .map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }

  return next();
}

module.exports = {
  validateProductCreate,
  validateProductEdit,
  validateProductId,
  validateProductRouteId,
  validateCategoryId,
  validateSearch,
  checkProductValidation,
};
