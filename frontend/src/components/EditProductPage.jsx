import style from '../styles/EditProductPage.module.css';
import { NavLink, useParams } from 'react-router';
import checkedIcon from '../assets/svgs/checked.svg';
import cancelIcon from '../assets/svgs/cancel.svg';
import rightArrowIcon from '../assets/svgs/right_arrow.svg';
import StockCheck from './StockCheck';
import { categoryMap } from '../constants/categories';
import { statusMap } from '../constants/stockStatus';
import { useNavigate } from 'react-router';
import useProduct from '../constants/useProduct';
import { useState } from 'react';
import { selectionInput } from '../constants/selection';
import Validate from '../constants/validators';

export default function EditProductPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useProduct(id);
  const [editedProduct, setEditedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    weight: '',
    origin: '',
  });

  const validator = new Validate();

  if (product && editedProduct === null) {
    setEditedProduct(product);
    return null;
  }

  if (!product || !editedProduct) return null;

  const category = categoryMap[product.category_id];
  const selectionMeniu = selectionInput[product.category_id];

  function handleChangeAndErrors(
    key,
    value,
    validatorKey,
    validatorLabel = '',
  ) {
    setEditedProduct((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrorMessage((prev) => ({
      ...prev,
      [key]: validator.validate(validatorKey, value, validatorLabel),
    }));
  }

  async function handlePost(e) {
    e.preventDefault();

    const response = await fetch(`${API_URL}/products/${id}/edit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedProduct),
    });

    if (!response.ok) {
      throw new Error(`The chages couldn't be saved.`);
    }

    navigate(`/products/${id}`);
  }

  return (
    <main className={style.editProductMain}>
      <article className={style.editProduct}>
        <header className={style.editProductHeader}>
          <nav className={style.editProductNavigation} aria-label="breadcrumb">
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.activeLink : ''
                  }
                  to={`/products/${product.id}`}
                >
                  {product.name}
                </NavLink>
              </li>
              <li>
                <img src={rightArrowIcon} alt="" aria-hidden="true" />
              </li>
              <li aria-current="page">Edit</li>
            </ul>
          </nav>
        </header>
        <form
          id="edit-product-form"
          className={style.editForm}
          onSubmit={handlePost}
        >
          <fieldset className={style.basicDetailsFieldset}>
            <legend>Details</legend>

            <div className={style.category}>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={category.name}
                readOnly
              />
            </div>

            <div className={style.name}>
              <label htmlFor="productName">Product name</label>
              <input
                id="productName"
                name="name"
                type="text"
                value={editedProduct.name}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\p{L} ]/gu, '');
                  handleChangeAndErrors('name', value, 'productName');
                }}
                placeholder="Enter product name"
                minLength={5}
                maxLength={30}
                pattern="[\p{L} ]+"
                title="Use letters and spaces only."
                autoComplete="off"
                required
              />
              <span
                className={style.errorMessage}
                style={{
                  display: errorMessage.name ? 'block' : 'none',
                }}
              >
                {errorMessage.name}
              </span>
            </div>

            <div className={style.description}>
              <label htmlFor="productDescription">Description</label>
              <textarea
                id="productDescription"
                name="description"
                value={editedProduct.description}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChangeAndErrors(
                    'description',
                    value,
                    'productDescription',
                  );
                }}
                placeholder="Describe the product (20-200 characters)"
                minLength={20}
                maxLength={200}
                required
              />
              <span
                className={style.errorMessage}
                style={{
                  display: errorMessage.description ? 'block' : 'none',
                }}
              >
                {errorMessage.description}
              </span>
            </div>

            <div className={style.priceAndQuantity}>
              <div className={style.price}>
                <label htmlFor="productPrice">Price</label>
                <input
                  id="productPrice"
                  name="price"
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChangeAndErrors('price', value, 'productPrice');
                  }}
                  placeholder="Enter price"
                  min={1}
                  max={999}
                  step="0.01"
                  inputMode="decimal"
                  required
                />
                <span
                  className={style.errorMessage}
                  style={{ display: errorMessage.price ? 'block' : 'none' }}
                >
                  {errorMessage.price}
                </span>
              </div>

              <div className={style.quantity}>
                <label htmlFor="productQuantity">Quantity</label>
                <input
                  id="productQuantity"
                  name="quantity"
                  type="number"
                  value={editedProduct.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChangeAndErrors('quantity', value, 'productQuantity');
                  }}
                  placeholder="Enter quantity"
                  min={0}
                  max={999}
                  step={1}
                  inputMode="numeric"
                  required
                />
                <span
                  className={style.errorMessage}
                  style={{ display: errorMessage.quantity ? 'block' : 'none' }}
                >
                  {errorMessage.quantity}
                </span>
              </div>
            </div>
          </fieldset>

          <fieldset className={style.attributesFieldset}>
            <legend>Attributes</legend>

            {Array.from(
              { length: Math.ceil(category.attributes.length / 2) },
              (_, index) => category.attributes.slice(index * 2, index * 2 + 2),
            ).map((pair, index) => (
              <div className={style.originAndRoast} key={index}>
                {pair.map((attr) => {
                  const selection = selectionMeniu.find(
                    (obj) => obj.key === attr.key,
                  );
                  const value = editedProduct[attr.key] ?? '';
                  const originalValue = product[attr.key];
                  const isNumberAttribute =
                    originalValue !== null &&
                    originalValue !== undefined &&
                    originalValue !== '' &&
                    Number.isFinite(Number(originalValue));

                  return (
                    <div key={attr.key}>
                      <label htmlFor={attr.key}>{attr.label}</label>

                      {selection ? (
                        <select
                          id={attr.key}
                          name={attr.key}
                          value={value}
                          onChange={(e) => {
                            const value = e.target.value;

                            setEditedProduct((prev) => ({
                              ...prev,
                              [attr.key]: value,
                            }));
                          }}
                          required
                        >
                          {selection.values.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : isNumberAttribute ? (
                        <>
                          <input
                            id={attr.key}
                            name={attr.key}
                            type="number"
                            value={value}
                            onChange={(e) =>
                              handleChangeAndErrors(
                                attr.key,
                                e.target.value,
                                'attributeNumber',
                                attr.label,
                              )
                            }
                            placeholder={`Enter ${attr.label.toLowerCase()}`}
                            min={1}
                            max={999}
                            step={1}
                            inputMode="numeric"
                            required
                          />
                          <span
                            className={style.errorMessage}
                            style={{
                              display: errorMessage.weight ? 'block' : 'none',
                            }}
                          >
                            {errorMessage.weight}
                          </span>
                        </>
                      ) : (
                        <>
                          <input
                            id={attr.key}
                            name={attr.key}
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const text = e.target.value.replace(
                                /[^\p{L} ]/gu,
                                '',
                              );

                              handleChangeAndErrors(
                                attr.key,
                                text,
                                'attributeText',
                                attr.label,
                              );
                            }}
                            placeholder={`Enter ${attr.label.toLowerCase()}`}
                            minLength={5}
                            maxLength={30}
                            pattern="[\p{L} ]+"
                            title="Use letters and spaces only."
                            autoComplete="off"
                            required
                          />
                          <span
                            className={style.errorMessage}
                            style={{
                              display: errorMessage.origin ? 'block' : 'none',
                            }}
                          >
                            {errorMessage.origin}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </fieldset>
        </form>
        <section className={style.editValuesSection}>
          <h2>CURRENT VALUES</h2>
          <ul>
            <li>
              <span>Price</span>
              <span>${product.price}</span>
            </li>
            <li>
              <span>Stock</span>
              <span>{product.quantity} units</span>
            </li>
            <li>
              <span>Availability</span>
              <span>
                <StockCheck
                  available={product.available}
                  status_map={statusMap}
                />
              </span>
            </li>
          </ul>
        </section>
        <section className={style.editActionsSection}>
          <h2>ACTIONS</h2>
          <button form="edit-product-form" type="submit">
            <img
              src={checkedIcon}
              className={style.editSaveIcon}
              aria-hidden="true"
            />
            Save changes
          </button>
          <button onClick={() => navigate(`/products/${product.id}`)}>
            <img
              src={cancelIcon}
              alt=""
              className={style.editCancelIcon}
              aria-hidden="true"
            />
            Cancel
          </button>
        </section>
      </article>
    </main>
  );
}
