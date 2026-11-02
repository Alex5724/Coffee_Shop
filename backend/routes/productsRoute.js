const { Router } = require("express");
const router = Router();

const {
  validateProductCreate,
  validateProductEdit,
  validateProductId,
  validateProductRouteId,
  validateCategoryId,
  validateSearch,
  checkProductValidation,
} = require("../middleware/productValidation");
const productsController = require("../controllers/productsController");

router.get(
  "/",
  validateSearch,
  checkProductValidation,
  productsController.getAllProducts,
);

router.get(
  "/:categoryId",
  validateCategoryId,
  validateSearch,
  checkProductValidation,
  productsController.getProducts,
);

router.get(
  "/product/:productId",
  validateProductId,
  checkProductValidation,
  productsController.getProduct,
);

router.patch(
  "/:id/edit",
  validateProductRouteId,
  validateProductEdit,
  checkProductValidation,
  productsController.patchProduct,
);

router.delete(
  "/:id/delete",
  validateProductRouteId,
  checkProductValidation,
  productsController.deleteProduct,
);

router.post(
  "/new",
  validateProductCreate,
  checkProductValidation,
  productsController.postNewProduct,
);

module.exports = router;
