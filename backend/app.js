require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const cors = require('cors');
const categoriesRouter = require('./routes/categoriesRouter');
const productsRouter = require('./routes/productsRoute');

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
