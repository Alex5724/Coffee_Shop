require('dotenv').config();
const { Client } = require('pg');

async function main() {
  const SQL = `
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
    );
    
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    available VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    origin VARCHAR(100) NOT NULL,
    roast_level VARCHAR(50) NOT NULL,
    format VARCHAR(50) NOT NULL,
    weight INTEGER NOT NULL,
    type VARCHAR(50),
    caffeine_level VARCHAR(50),
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name, description)
VALUES
  ('Coffee', 'Single-origin and blended coffees in a range of roast levels and formats, sourced from farms around the world.'),
  ('Tea', 'Loose leaf and bagged teas spanning green, black, white, oolong, and herbal varieties from renowned growing regions.');`;

  const client = new Client({
    connectionString: process.argv[2] || process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
