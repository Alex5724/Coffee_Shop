import style from '../styles/Categories.module.css';
import { useState, useEffect } from 'react';
import GenerateCategories from './GenerateCategories';

export default function Categories() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
          throw new Error('There has been a problem.');
        }
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, [API_URL]);

  return (
    <main className={style.categories_main}>
      <section className={style.container} aria-labelledby="categories-heading">
        <header className={style.categories_header}>
          <h2 id="categories-heading">Categories</h2>
          <p>Browse inventory by category.</p>
        </header>
        <GenerateCategories style={style} categories={categories} />
      </section>
    </main>
  );
}
