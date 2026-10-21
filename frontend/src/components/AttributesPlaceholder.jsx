import style from '../styles/AttributesPlaceholder.module.css';
import discountIcon from '../assets/svgs/discount.svg';

export default function AttributesPlaceholder() {
  return (
    <div className={style.placeholderCard}>
      <img src={discountIcon} alt="" aria-hidden="true" />
      <p>Select a category above to see its required attributes</p>
    </div>
  );
}
