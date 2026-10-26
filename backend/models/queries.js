const pool = require('./pool');

async function getCategories() {
  const { rows } = await pool.query(`
    SELECT
      c.*,
      COUNT(p.id) AS product_quantity
    FROM category AS c
    LEFT JOIN product AS p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id ASC
  `);

  return rows;
}

async function getProducts(id, search = '') {
  const { rows } = await pool.query(
    'SELECT * FROM product WHERE category_id = $1 AND name ILIKE $2',
    [id, `%${search}%`],
  );

  return rows;
}

async function getAllProducts(search) {
  const { rows } = await pool.query(
    `SELECT 
       product.*, 
       category.name AS category_name
     FROM product
     JOIN category
       ON product.category_id = category.id
     WHERE product.name ILIKE $1`,
    [`%${search}%`],
  );

  return rows;
}

async function getProduct(id) {
  const { rows } = await pool.query(`SELECT * FROM product WHERE id = $1`, [
    id,
  ]);

  return rows;
}

async function patchProduct(id, body) {
  if (!/^\d+$/.test(String(id))) {
    throw new Error('Invalid product id.');
  }

  const quantity = Number(body.quantity);

  if (quantity === 0) {
    body.available = 'Out of stock';
  } else if (quantity <= 5) {
    body.available = 'Low stock';
  } else if (quantity > 5) {
    body.available = 'In stock';
  }

  const entries = Object.entries(body).filter(
    ([key]) => key !== 'id' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key),
  );

  const keys = entries.map(([key]) => key);
  const values = entries.map(([, value]) => value);

  if (keys.length === 0) {
    return;
  }

  const items = keys.map((key, index) => `"${key}"=$${index + 1}`).join(', ');

  values.push(id);

  await pool.query(
    `UPDATE product SET ${items} WHERE id=$${values.length}`,
    values,
  );
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM product WHERE id = $1', [id]);
}

async function postNewProduct(body) {
  const quantity = Number(body.quantity);

  if (quantity === 0) {
    body.available = 'Out of stock';
  } else if (quantity <= 5) {
    body.available = 'Low stock';
  } else if (quantity > 5) {
    body.available = 'In stock';
  }

  const keys = Object.keys(body);
  const columns = keys.map((key) => `"${key}"`).join(', ');
  const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
  const values = Object.values(body);

  await pool.query(
    `INSERT INTO product (${columns}) VALUES (${placeholders})`,
    values,
  );
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
