const db = require("../models/queries");

async function getProducts(req, res) {
  const products = await db.getProducts(
    req.params.categoryId,
    req.query.search ?? "",
  );
  return res.status(200).json(products);
}

async function getAllProducts(req, res) {
  const products = await db.getAllProducts(req.query.search ?? "");
  return res.status(200).json(products);
}

async function getProduct(req, res) {
  const product = await db.getProduct(req.params.productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.status(200).json([product]);
}

async function patchProduct(req, res) {
  const product = await db.patchProduct(req.params.id, req.body);

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.status(200).json(product);
}

async function deleteProduct(req, res) {
  const deleted = await db.deleteProduct(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.status(204).end();
}

async function postNewProduct(req, res) {
  const product = await db.postNewProduct(req.body);
  return res.status(201).json(product);
}

module.exports = {
  getProducts,
  getAllProducts,
  getProduct,
  patchProduct,
  deleteProduct,
  postNewProduct,
};
