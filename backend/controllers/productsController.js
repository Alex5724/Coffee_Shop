const db = require("../models/queries");

async function getProducts(req, res) {
  const { categoryId } = req.params;
  const search = req.query.search || "";
  const products = await db.getProducts(categoryId, search);
  res.status(200).json(products);
}

async function getAllProducts(req, res) {
  const search = req.query.search || "";
  const products = await db.getAllProducts(search);
  res.status(200).json(products);
}

async function getProduct(req, res) {
  const { productId } = req.params;
  const product = await db.getProduct(productId);
  res.status(200).json(product);
}

async function patchProduct(req, res) {
  const { id } = req.params;
  const body = req.body;

  await db.patchProduct(id, body);
  res.sendStatus(200);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await db.deleteProduct(id);

  res.sendStatus(200);
}

async function postNewProduct(req, res) {
  const body = req.body;

  await db.postNewProduct(body);

  res.sendStatus(201);
}

module.exports = {
  getProducts,
  getAllProducts,
  getProduct,
  patchProduct,
  deleteProduct,
  postNewProduct,
};
