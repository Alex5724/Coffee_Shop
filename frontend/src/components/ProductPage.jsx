import style from '../styles/ProductPage.module.css';
import { Link, useParams } from 'react-router';
import editIcon from '../assets/svgs/edit_pen.svg';
import deleteIcon from '../assets/svgs/delete_bin.svg';
import rightArrowIcon from '../assets/svgs/right_arrow.svg';
import StockCheck from './StockCheck';
import useProduct from '../constants/useProduct';
import { categoryMap } from '../constants/categories';
import { statusMap } from '../constants/stockStatus';
import { useNavigate } from 'react-router';

export default function ProductPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useProduct(id);

  if (!product) return null;
  const categoryId = product.category_id;
  const category = categoryMap[product.category_id];

  async function handleDelete() {
    const response = await fetch(`${API_URL}/products/${id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`The product couldn't be deleted.`);
    }

    navigate(`/products/${categoryId}/${category.name}`);
  }

  return (
    <main className={style.productMain}>
      <article className={style.product}>
        <header className={style.productHeader}>
          <nav className={style.productNavigation} aria-label="breadcrumb">
            <ul>
              <li>
                <Link to={`/products/${product.category_id}/${category.name}`}>
                  {category.name}
                </Link>
              </li>
              <li>
                <img src={rightArrowIcon} alt="" aria-hidden="true" />
              </li>
              <li aria-current="page">{product.name}</li>
            </ul>
          </nav>
        </header>
        <div className={category.className}>
          <img src={category.icon} alt="" aria-hidden="true" />
        </div>
        <section className={style.descriptionSection}>
          <h2>{product.name}</h2>
          <div className={style.descriptionTags}>
            <p className={category.productNameStyle}>{category.name}</p>

            <StockCheck available={product.available} status_map={statusMap} />
          </div>
          <p>{product.description}</p>
        </section>

        <section className={style.attributesSection}>
          <h2>ATTRIBUTES</h2>
          <ul>
            {category.attributes.map((attr) => (
              <li key={attr.label}>
                <span>{attr.label}</span>
                <span>{product[attr.key]}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={style.pricingSection}>
          <h2>PRICING & STOCK</h2>
          <p>
            <span>${product.price}</span> per unit
          </p>
          <p>
            <span>Stock quantity</span>
            <span>{product.quantity} units</span>
          </p>
        </section>
        <section className={style.actionsSection}>
          <h2>ACTIONS</h2>
          <button onClick={() => navigate(`/products/${product.id}/edit`)}>
            <img src={editIcon} className={style.editIcon} aria-hidden="true" />
            Edit product
          </button>
          <button onClick={() => handleDelete()}>
            <img
              src={deleteIcon}
              alt=""
              className={style.deleteIcon}
              aria-hidden="true"
            />
            Delete product
          </button>
        </section>
      </article>
    </main>
  );
}
