import { useEffect, useState } from 'react';

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadProduct() {
      try {
        const response = await fetch(
          `http://localhost:3000/products/product/${id}`,
          { signal: controller.signal },
        );

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
