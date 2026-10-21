import { Link } from 'react-router';

export default function GenerateCategories({ categories, style, icons }) {
  return (
    <>
      <ul className={style.categories_list}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/products/${category.id}/${category.name}`}
              state={{ name: category.name }}
              className={style.category_card}
            >
              <header className={style.category_header}>
                <span aria-hidden="true">
                  <img
                    src={icons[category.name]}
                    alt=""
                    className={style.category_icon}
                  />
                </span>
              </header>

              <div className={style.category_body}>
                <h3>{category.name}</h3>

                <p className={style.category_description}>
                  {category.description}
                </p>

                <p className={style.category_count}>
                  {category.product_quantity} products
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
