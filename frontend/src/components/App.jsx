import '../styles/App.css';
import { products_filters } from '../constants/productsFilters';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(null);
  const [screen, setScreen] = useState({
    mediumScreen: window.innerWidth <= 650,
    smallScreen: window.innerWidth <= 600,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreen((prev) => ({
        ...prev,
        mediumScreen: window.innerWidth <= 650,
        smallScreen: window.innerWidth <= 600,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function generateFilters(products) {
    return products.reduce((acc, product) => {
      Object.entries(product).forEach(([key, value]) => {
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(value);
      });
      return acc;
    }, {});
  }

  const rawFilters = generateFilters(products);

  function filters(name) {
    return Object.keys(rawFilters).reduce((acc, key) => {
      if (products_filters[name][key] && key === 'weight') {
        acc[products_filters[name][key]] = Array.from(rawFilters[key]).sort(
          (a, b) => a - b,
        );
      } else if (products_filters[name][key]) {
        acc[products_filters[name][key]] = Array.from(rawFilters[key]);
      }
      return acc;
    }, {});
  }

  function selectedFilters(key, value) {
    setAvailableFilters((prev) => {
      const updated = { ...prev };

      if (!updated[key]) updated[key] = [];

      if (updated[key].includes(value)) {
        updated[key] = updated[key].filter((v) => v !== value);
        if (updated[key].length === 0) {
          delete updated[key];
        }
      } else {
        updated[key] = [...updated[key], value];
      }

      return updated;
    });

    setFiltersApplied(false);
  }

  function applyFilters() {
    setAppliedFilters(availableFilters);

    if (Object.keys(availableFilters).length === 0) {
      setFilteredProducts(products);
      setFiltersApplied(true);
      return;
    }

    const filtered = products.filter((product) =>
      Object.entries(availableFilters).every(([key, values]) =>
        values.includes(product[key]),
      ),
    );

    setFilteredProducts(filtered);
    setFiltersApplied(true);
  }

  function clearFilters() {
    setFilteredProducts([]);
    setAvailableFilters({});
    setAppliedFilters({});
    setFiltersApplied(false);
  }

  return (
    <>
      <Header screen={screen} />
      <Outlet
        context={{
          //states
          setProducts,
          products,

          availableFilters,
          appliedFilters,

          filteredProducts,
          filtersApplied,

          numberOfProducts,
          setNumberOfProducts,

          screen,

          //functions
          filters,
          selectedFilters,
          clearFilters,
          applyFilters,
        }}
      />
      <Footer screen={screen} />
    </>
  );
}

export default App;
