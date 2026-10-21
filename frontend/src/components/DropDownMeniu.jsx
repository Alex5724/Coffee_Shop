import style from '../styles/DropDownMeniu.module.css';
import { useOutletContext } from 'react-router';

export default function DropDownMeniu({ name, setShowMeniu }) {
  const {
    filters,
    selectedFilters,
    availableFilters,
    applyFilters,
    clearFilters,
  } = useOutletContext();

  return (
    <div className={style.dropDown}>
      {Object.entries(filters(name)).map(([filterName, filterValues]) => (
        <section key={filterName} className={style.dropDownSection}>
          <h3>{filterName.replaceAll('_', ' ')}</h3>
          <div>
            {filterValues.map((value) => (
              <button
                key={value}
                onClick={() => selectedFilters(filterName, value)}
                className={
                  availableFilters[filterName]?.includes(value)
                    ? style.active
                    : ''
                }
              >
                {value}
              </button>
            ))}
          </div>
        </section>
      ))}

      <footer className={style.dropDownFooter}>
        <button
          className={style.clearBtn}
          onClick={() => {
            clearFilters();
            setShowMeniu(false);
          }}
        >
          Clear
        </button>
        <button
          className={style.applyBtn}
          onClick={() => {
            applyFilters();
            setShowMeniu(false);
          }}
        >
          Apply
        </button>
      </footer>
    </div>
  );
}
