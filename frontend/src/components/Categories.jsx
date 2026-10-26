import coffeeIcon from '../assets/svgs/coffee_cup.svg';
import teaIcon from '../assets/svgs/tea_icon.svg';
import style from '../styles/Categories.module.css';
import { useState, useEffect } from 'react';
import GenerateCategories from './GenerateCategories';

export default function Categories() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadCategories() {
      const responde = await fetch(`${API_URL}/categories`);

      const data = await responde.json();

      setCategories(data);
    }

    loadCategories();
  }, []);

  const icons = {
    Coffee: coffeeIcon,
    Tea: teaIcon,
  };

  return (
    <main className={style.categories_main}>
      <section className={style.container} aria-labelledby="categories-heading">
        <header className={style.categories_header}>
          <h2 id="categories-heading">Categories</h2>
          <p>Browse inventory by category.</p>
        </header>
        <GenerateCategories
          style={style}
          categories={categories}
          icons={icons}
        />
      </section>
    </main>
  );
}
