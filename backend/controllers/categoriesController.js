const db = require("../models/queries");

async function getCategories(req, res) {
  const categories = await db.getCategories();

  res.status(200).json(categories);
}

module.exports = {
  getCategories,
};
