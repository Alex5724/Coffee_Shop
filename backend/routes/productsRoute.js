const { Router } = require("express");
const router = Router();

const {
  validateProductEdit,
  checkProductValidation,
} = require("../middleware/productValidation");

const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);

router.get("/:categoryId", productsController.getProducts);

router.get("/product/:productId", productsController.getProduct);

router.patch(
  "/:id/edit",
  validateProductEdit,
  checkProductValidation,
  productsController.patchProduct,
);

router.delete("/:id/delete", productsController.deleteProduct);

router.post("/new", productsController.postNewProduct);

module.exports = router;
