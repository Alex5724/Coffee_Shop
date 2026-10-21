import style from '../styles/AddProductPage.module.css';
import { NavLink } from 'react-router';
import checkedIcon from '../assets/svgs/checked.svg';
import cancelIcon from '../assets/svgs/cancel.svg';
import rightArrowIcon from '../assets/svgs/right_arrow.svg';
import { categoryMap } from '../constants/categories';
import { useRef, useState } from 'react';
import { selectionInput } from '../constants/selection';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Validate from '../constants/validators';
import AttributesPlaceholder from './AttributesPlaceholder';

export default function AddProductPage() {
  const [category, setCategory] = useState(null);
  const [selectionMeniu, setSelectionMeniu] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    weight: '',
    origin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controllerRef = useRef(null);
  const navigate = useNavigate();

  const validator = new Validate();

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (controllerRef.current) return;

    const controller = new AbortController();
    controllerRef.current = controller;
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const body = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('http://localhost:3000/products/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`The process couldn't be done.`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      throw error;
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setIsSubmitting(false);
        navigate('/products');
      }
    }
  }
  return (
    <main className={style.addProductMain}>
      <article className={style.addProduct}>
        <header className={style.addProductHeader}>
          <nav className={style.addProductNavigation} aria-label="breadcrumb">
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? style.activeLink : ''
                  }
                  to={`/products`}
                >
                  All products
                </NavLink>
              </li>
              <li>
                <img src={rightArrowIcon} alt="" aria-hidden="true" />
              </li>
              <li aria-current="page">Add product</li>
            </ul>
          </nav>
        </header>

        <form
          id="edit-product-form"
          className={style.addForm}
          onSubmit={handleSubmit}
        >
          <fieldset className={style.basicDetailsFieldset}>
            <legend>Details</legend>

            <div className={style.category}>
              <label htmlFor="category">Category</label>
              <select
                name="category_id"
                id="category"
                defaultValue=""
                onChange={(e) => {
                  setCategory(categoryMap[e.target.value]);
                  setSelectionMeniu(selectionInput[e.target.value]);
                }}
                required
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                <option value="1">Coffee</option>
                <option value="2">Tea</option>
              </select>
            </div>

            <div className={style.name}>
              <label htmlFor="productName">Product name</label>
              <input
                id="productName"
                name="name"
                type="text"
                placeholder="Enter product name"
                minLength={5}
                maxLength={30}
                pattern="[\p{L} ]+"
                title="Use letters and spaces only."
                autoComplete="off"
                onChange={(e) => {
                  setErrorMessage((prev) => ({
                    ...prev,
                    name: validator.validate('productName', e.target.value),
                  }));
                }}
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
                placeholder="Describe the product (20-200 characters)"
                minLength={20}
                maxLength={200}
                onChange={(e) => {
                  setErrorMessage((prev) => ({
                    ...prev,
                    description: validator.validate(
                      'productDescription',
                      e.target.value,
                    ),
                  }));
                }}
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
                  placeholder="Enter price"
                  min={1}
                  max={999}
                  step="0.01"
                  inputMode="decimal"
                  onChange={(e) => {
                    setErrorMessage((prev) => ({
                      ...prev,
                      price: validator.validate('productPrice', e.target.value),
                    }));
                  }}
                  required
                />
                <span
                  className={style.errorMessage}
                  style={{
                    display: errorMessage.price ? 'block' : 'none',
                  }}
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
                  placeholder="Enter quantity"
                  min={0}
                  max={999}
                  step={1}
                  inputMode="numeric"
                  onChange={(e) => {
                    setErrorMessage((prev) => ({
                      ...prev,
                      quantity: validator.validate(
                        'productQuantity',
                        e.target.value,
                      ),
                    }));
                  }}
                  required
                />
                <span
                  className={style.errorMessage}
                  style={{
                    display: errorMessage.quantity ? 'block' : 'none',
                  }}
                >
                  {errorMessage.quantity}
                </span>
              </div>
            </div>
          </fieldset>
          <fieldset className={style.attributesFieldset}>
            <legend>Attributes</legend>
            {category ? (
              Array.from(
                { length: Math.ceil(category.attributes.length / 2) },
                (_, index) =>
                  category.attributes.slice(index * 2, index * 2 + 2),
              ).map((pair, index) => (
                <div className={style.attributes} key={index}>
                  {pair.map((attr) => {
                    const selection = selectionMeniu.find(
                      (obj) => obj.key === attr.key,
                    );

                    return (
                      <div key={attr.key}>
                        <label htmlFor={attr.key}>{attr.label}</label>

                        {selection ? (
                          <select
                            id={attr.key}
                            name={attr.key}
                            defaultValue=""
                            required
                          >
                            <option value="" disabled hidden>
                              Select the {attr.label.toLowerCase()}
                            </option>
                            {selection.values.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : attr.type === 'numeric' ? (
                          <>
                            <input
                              id={attr.key}
                              name={attr.key}
                              type="number"
                              placeholder={`Enter ${attr.label.toLowerCase()}`}
                              min={1}
                              max={999}
                              step={1}
                              inputMode="numeric"
                              onChange={(e) => {
                                setErrorMessage((prev) => ({
                                  ...prev,
                                  weight: validator.validate(
                                    'attributeNumber',
                                    e.target.value,
                                    `${attr.label}`,
                                  ),
                                }));
                              }}
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
                              placeholder={`Enter ${attr.label.toLowerCase()}`}
                              minLength={5}
                              maxLength={30}
                              pattern="[\p{L} ]+"
                              title="Use letters and spaces only."
                              autoComplete="off"
                              onChange={(e) => {
                                setErrorMessage((prev) => ({
                                  ...prev,
                                  origin: validator.validate(
                                    'attributeText',
                                    e.target.value,
                                    `${attr.label}`,
                                  ),
                                }));
                              }}
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
              ))
            ) : (
              <AttributesPlaceholder />
            )}
          </fieldset>
        </form>
        <section className={style.addActionsSection}>
          <h2>ACTIONS</h2>
          <button
            form="edit-product-form"
            type="submit"
            disabled={isSubmitting}
          >
            <img
              src={checkedIcon}
              className={style.editSaveIcon}
              aria-hidden="true"
            />
            Add product
          </button>
          <button onClick={() => navigate(`/`)}>
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
