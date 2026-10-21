import style from '../styles/GenerateProductCards.module.css';
import StockCheck from './StockCheck';
import { statusMap } from '../constants/stockStatus';
import { useNavigate } from 'react-router';

export default function GenerateProductCards({ products }) {
  const navigate = useNavigate();
  return products.map((product) => (
    <article
      key={product.id}
      className={style.productContainer}
      aria-label={product.name}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className={style.productDetails}>
        <div className={style.productTitlePriceQty}>
          <h2 className={style.productTitle}>{product.name}</h2>
          <div className={style.productPriceQuantity}>
            <p className={style.productPrice}>{product.price}$</p>
            <p className={style.productQuantity}>Qty: {product.quantity}</p>
          </div>
        </div>
      </div>
      <StockCheck available={product.available} status_map={statusMap} />
    </article>
  ));
}
