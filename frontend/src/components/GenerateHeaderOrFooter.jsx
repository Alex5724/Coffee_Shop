import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';

export default function GenerateHeaderOrFooter({
  style,
  plusSVG,
  plusSmallScreen,
  screen,
  menuSVG,
  packageSVG,
}) {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul className={style.navigation_links}>
          <li>
            <NavLink
              to="/"
              end
              className={
                !screen.mediumScreen
                  ? ({ isActive }) => (isActive ? style.activeLink : '')
                  : ''
              }
            >
              {screen.mediumScreen && (
                <img
                  src={menuSVG}
                  alt=""
                  aria-hidden="true"
                  className={style.menu_icon}
                ></img>
              )}
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              end
              className={
                !screen.mediumScreen
                  ? ({ isActive }) => (isActive ? style.activeLink : '')
                  : ''
              }
            >
              {screen.mediumScreen && (
                <img
                  src={packageSVG}
                  alt=""
                  aria-hidden="true"
                  className={style.package_icon}
                ></img>
              )}
              All products
            </NavLink>
          </li>
          {screen.mediumScreen && (
            <li>
              <NavLink
                to="/products/new"
                end
                className={({ isActive }) => (isActive ? style.activeLink : '')}
              >
                <img
                  src={plusSmallScreen}
                  alt=""
                  aria-hidden="true"
                  className={style.package_icon}
                />
                Add product
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {!screen.mediumScreen && (
        <button
          type="button"
          className={style.add_btn}
          onClick={() => navigate('/products/new')}
        >
          <img
            src={plusSVG}
            alt=""
            aria-hidden="true"
            className={style.plus_icon}
          />
          Add product
        </button>
      )}
    </>
  );
}
