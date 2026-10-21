import { useEffect, useState } from 'react';
import style from '../styles/SmallScreenDropDownMeniu.module.css';
import cancelIcon from '../assets/svgs/cancel.svg';
import { useOutletContext } from 'react-router';

export default function SmallScreenDropDownMeniu({
  name,
  setShowMeniu,
  dialogRef,
}) {
  const {
    filters,
    selectedFilters,
    availableFilters,
    applyFilters,
    clearFilters,
  } = useOutletContext();

  const [isClosing, setIsClosing] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    setIsClosing(false);

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [dialogRef]);

  function closeWithAnimation() {
    if (isClosing) return;

    setIsClosing(true);

    window.setTimeout(() => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
      }

      setShowMeniu(false);
    }, 500);
  }

  function handleClear() {
    clearFilters();
    closeWithAnimation();
  }

  function handleApply() {
    applyFilters();
    closeWithAnimation();
  }

  return (
    <dialog
      ref={dialogRef}
      className={`${style.dropDownDialog} ${
        isClosing ? style.close : style.open
      }`}
      onCancel={(event) => {
        event.preventDefault();
        closeWithAnimation();
      }}
    >
      <div className={style.dropDown}>
        <header className={style.dropDownHeader}>
          <h2>Filter products</h2>
          <button
            type="button"
            aria-label="Close filters"
            onClick={closeWithAnimation}
          >
            <img src={cancelIcon} alt="" aria-hidden="true" />
          </button>
        </header>

        {Object.entries(filters(name)).map(([filterName, filterValues]) => (
          <section key={filterName} className={style.dropDownSection}>
            <h3>{filterName.replaceAll('_', ' ')}</h3>
            <div>
              {filterValues.map((value) => (
                <button
                  key={value}
                  type="button"
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
            type="button"
            className={style.clearBtn}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className={style.applyBtn}
            onClick={handleApply}
          >
            Apply
          </button>
        </footer>
      </div>
    </dialog>
  );
}
