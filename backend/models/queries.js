const pool = require("./pool");

const PRODUCT_COLUMNS = [
  "name",
  "price",
  "description",
  "available",
  "quantity",
  "origin",
  "roast_level",
  "format",
  "weight",
  "type",
  "caffeine_level",
  "category_id",
];

function stockStatus(quantity) {
  if (quantity === 0) {
    return "Out of stock";
  }
  if (quantity <= 5) {
    return "Low stock";
  }
  return "In stock";
}

async function getCategories() {
  const { rows } = await pool.query(`
    SELECT
      c.*,
      COUNT(p.id)::int AS product_quantity
    FROM category AS c
    LEFT JOIN product AS p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id ASC
  `);

  return rows;
}

async function getProducts(categoryId, search = "") {
  const { rows } = await pool.query(
    "SELECT * FROM product WHERE category_id = $1 AND name ILIKE $2 ORDER BY id",
    [Number(categoryId), `%${search}%`],
  );

  return rows;
}

async function getAllProducts(search = "") {
  const { rows } = await pool.query(
    `SELECT
       product.*,
       category.name AS category_name
     FROM product
     JOIN category ON product.category_id = category.id
     WHERE product.name ILIKE $1
     ORDER BY product.id`,
    [`%${search}%`],
  );

  return rows;
}

async function getProduct(id) {
  const { rows } = await pool.query("SELECT * FROM product WHERE id = $1", [
    Number(id),
  ]);

  return rows[0] ?? null;
}

async function patchProduct(id, body) {
  const quantity = Number(body.quantity);
  const values = {
    name: body.name,
    price: Number(body.price),
    description: body.description,
    available: stockStatus(quantity),
    quantity,
    origin: body.origin,
    roast_level: body.roast_level ?? null,
    format: body.format,
    weight: Number(body.weight),
    type: body.type ?? null,
    caffeine_level: body.caffeine_level ?? null,
  };

  const assignments = PRODUCT_COLUMNS.slice(0, -1)
    .map((column, index) => `"${column}" = $${index + 1}`)
    .join(", ");
  const parameters = PRODUCT_COLUMNS.slice(0, -1).map(
    (column) => values[column],
  );
  parameters.push(Number(id));

  const { rows } = await pool.query(
    `UPDATE product SET ${assignments} WHERE id = $${parameters.length} RETURNING *`,
    parameters,
  );

  return rows[0] ?? null;
}

async function deleteProduct(id) {
  const { rowCount } = await pool.query("DELETE FROM product WHERE id = $1", [
    Number(id),
  ]);

  return rowCount > 0;
}

async function postNewProduct(body) {
  const quantity = Number(body.quantity);
  const product = {
    name: body.name,
    price: Number(body.price),
    description: body.description,
    available: stockStatus(quantity),
    quantity,
    origin: body.origin,
    roast_level: body.roast_level ?? null,
    format: body.format,
    weight: Number(body.weight),
    type: body.type ?? null,
    caffeine_level: body.caffeine_level ?? null,
    category_id: Number(body.category_id),
  };

  const placeholders = PRODUCT_COLUMNS.map((_, index) => `$${index + 1}`).join(
    ", ",
  );
  const values = PRODUCT_COLUMNS.map((column) => product[column]);
  const { rows } = await pool.query(
    `INSERT INTO product (${PRODUCT_COLUMNS.map((column) => `"${column}"`).join(", ")})
     VALUES (${placeholders})
     RETURNING *`,
    values,
  );

  return rows[0];
}

module.exports = {
  getCategories,
  getProducts,
  getAllProducts,
  getProduct,
  patchProduct,
  deleteProduct,
  postNewProduct,
};
