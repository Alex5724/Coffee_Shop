import style from '../styles/Products.module.css';
import filterIcon from '../assets/svgs/filter.svg';
import searchIcon from '../assets/svgs/search.svg';
import { useParams } from 'react-router';
import GenerateProducts from './GenerateProducts';
import ProductsHeader from './ProductsHeader';

export default function Products() {
  const { name } = useParams();

  return (
    <>
      <main className={style.products_main}>
        <section aria-label={name}>
          <ProductsHeader
            style={style}
            searchIcon={searchIcon}
            filterIcon={filterIcon}
            name={name}
          />
          <GenerateProducts style={style} />
        </section>
      </main>
    </>
  );
}
