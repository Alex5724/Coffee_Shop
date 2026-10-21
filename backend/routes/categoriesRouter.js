const { Router } = require("express");
const router = Router();

const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.getCategories);

module.exports = router;
