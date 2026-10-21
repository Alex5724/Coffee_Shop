import App from '../components/App';
import Categories from '../components/Categories';
import Products from '../components/Products';
import AllProducts from '../components/AllProducts';
import ProductPage from '../components/ProductPage';
import EditProductPage from '../components/EditProductPage';
import AddProductPage from '../components/AddProductPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Categories /> },
      { path: 'products/new', element: <AddProductPage /> },

      { path: 'products', element: <AllProducts /> },
      { path: 'products/:id/edit', element: <EditProductPage /> },

      { path: 'products/:id/:name', element: <Products /> },

      { path: 'products/:id', element: <ProductPage /> },
    ],
  },
];

export default routes;
