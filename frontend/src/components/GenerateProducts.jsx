import StockCheck from './StockCheck';
import style from '../styles/StockCheck.module.css';
import { useOutletContext } from 'react-router';
import NoProductsFound from './NoProductsFound';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { statusMap } from '../constants/stockStatus';
import GenerateProductCards from './GenerateProductCards';

export default function GenerateProducts() {
  const navigate = useNavigate();
  const {
    products,
    filteredProducts,
    availableFilters,
    appliedFilters,
    filtersApplied,
    setNumberOfProducts,
    screen,
  } = useOutletContext();

  const filtersSelected = Object.keys(availableFilters).length > 0;
  const hasAppliedFilters = Object.keys(appliedFilters).length > 0;

  const noResults = hasAppliedFilters && filteredProducts.length === 0;

  let productsToShow;

  if (!filtersSelected && !hasAppliedFilters) {
    productsToShow = products;
  } else if (!filtersApplied && hasAppliedFilters) {
    productsToShow = filteredProducts;
  } else if (!filtersApplied && !hasAppliedFilters) {
    productsToShow = products;
  } else {
    productsToShow = filteredProducts;
  }

  useEffect(() => {
    setNumberOfProducts(productsToShow.length);
  }, [productsToShow]);

  return noResults ? (
    <NoProductsFound />
  ) : screen.smallScreen ? (
    <GenerateProductCards products={productsToShow} />
  ) : (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Availability</th>
        </tr>
      </thead>

      <tbody>
        {productsToShow.map((product) => (
          <tr
            key={product.id}
            className={style.row}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <StockCheck
                available={product.available}
                status_map={statusMap}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
