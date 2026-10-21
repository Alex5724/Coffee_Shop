import style from '../styles/Products.module.css';
import filterIcon from '../assets/svgs/filter.svg';
import searchIcon from '../assets/svgs/search.svg';
import GenerateProducts from './GenerateProducts';
import ProductsHeader from './ProductsHeader';
import { useOutletContext } from 'react-router';

export default function AllProducts() {
  const { filters, products, setProducts } = useOutletContext();
  return (
    <>
      <main className={style.products_main}>
        <section aria-label="All products">
          <ProductsHeader
            style={style}
            searchIcon={searchIcon}
            filterIcon={filterIcon}
            name={'All Products'}
            setProducts={setProducts}
            filters={filters('All Products')}
          />
          <GenerateProducts style={style} products={products} />
        </section>
      </main>
    </>
  );
}
