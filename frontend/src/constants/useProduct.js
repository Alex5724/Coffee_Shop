import { useEffect, useState } from 'react';

export default function useProduct(id) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadProduct() {
      try {
        const response = await fetch(`${API_URL}}/products/product/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data[0] ?? null);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  return product;
}
