import { useOutletContext } from 'react-router';
import SearchComponent from './SearchComponent';

export default function ProductsHeader({
  style,
  searchIcon,
  filterIcon,
  name,
}) {
  const { numberOfProducts } = useOutletContext();
  return (
    <header className={style.products_header}>
      <div className={style.page_title_description}>
        <h2>{name}</h2>

        <p>{numberOfProducts} products across the category</p>
      </div>

      <SearchComponent
        style={style}
        searchIcon={searchIcon}
        filterIcon={filterIcon}
        name={name}
      />
    </header>
  );
}
