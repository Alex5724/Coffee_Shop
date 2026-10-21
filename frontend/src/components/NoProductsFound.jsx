import { useOutletContext } from 'react-router';
import noProductsIcon from '../assets/svgs/no_products.svg';
import style from '../styles/NoProductsFound.module.css';

export default function NoProductsFound() {
  const { clearFilters } = useOutletContext();
  return (
    <section
      aria-labelledby="no-products-title"
      className={style.no_products_found}
    >
      <div class={style.icon_wrapper}>
        <img src={noProductsIcon} alt="" aria-hidden="true" />
      </div>

      <h2 id="no-products-title">No products found</h2>

      <p>
        No products match your current filters. Try adjusting or clearing your
        filters.
      </p>

      <button type="button" onClick={clearFilters}>
        Clear filters
      </button>
    </section>
  );
}
