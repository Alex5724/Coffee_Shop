import { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import useDebounce from './useDebounce';
import DropDownMeniu from './DropDownMeniu';
import SmallScreenDropDownMeniu from './SmallScreenDropDownMeniu';

export default function SearchComponent({
  style,
  searchIcon,
  filterIcon,
  name,
}) {
  const [search, setSearch] = useState('');
  const [showMeniu, setShowMeniu] = useState(false);

  const { id } = useParams();
  const { setProducts, screen } = useOutletContext();
  const dialogRef = useRef(null);

  const debouncedSearched = useDebounce(search, 300);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (showMeniu && screen.mediumScreen && !dialog.open) {
      dialog.showModal();
    } else if ((!showMeniu || !screen.mediumScreen) && dialog.open) {
      dialog.close();
    }
  }, [showMeniu, screen.mediumScreen]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFilteredProducts() {
      try {
        const baseUrl = id
          ? `http://localhost:3000/products/${id}`
          : 'http://localhost:3000/products';

        const url = debouncedSearched
          ? `${baseUrl}?search=${encodeURIComponent(debouncedSearched)}`
          : baseUrl;

        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }

    loadFilteredProducts();

    return () => controller.abort();
  }, [debouncedSearched, id, setProducts]);

  function toggleMenu() {
    setShowMeniu((isOpen) => !isOpen);
  }

  return (
    <div className={style.search_container}>
      <span className={style.searchIcon_container}>
        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className={style.searchIcon}
        />
      </span>

      <label htmlFor="search">Search product</label>

      <input
        type="search"
        name="search"
        id="search"
        value={search}
        placeholder="Search products..."
        className={style.searchInput}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button
        type="button"
        aria-expanded={showMeniu}
        aria-label="Filter products"
        className={style.filterBtn}
        onClick={toggleMenu}
      >
        <span className={style.filterIcon_container}>
          <img
            src={filterIcon}
            alt=""
            aria-hidden="true"
            className={style.filterIcon}
          />
        </span>
        Filter
      </button>

      {screen.mediumScreen
        ? showMeniu && (
            <SmallScreenDropDownMeniu
              name={name}
              showMeniu={showMeniu}
              setShowMeniu={setShowMeniu}
              dialogRef={dialogRef}
            />
          )
        : showMeniu && (
            <DropDownMeniu name={name} setShowMeniu={setShowMeniu} />
          )}
    </div>
  );
}
