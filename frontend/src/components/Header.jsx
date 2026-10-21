import style from '../styles/Header.module.css';
import plusSVG from '../assets/svgs/add_plus.svg';
import GenerateHeaderOrFooter from './GenerateHeaderOrFooter';

export default function Header({ screen }) {
  return (
    <header className={style.header}>
      <h1 className={style.shop_title}>
        <span>BREW</span> INVENTORY
      </h1>

      {!screen.mediumScreen && (
        <GenerateHeaderOrFooter
          style={style}
          plusSVG={plusSVG}
          screen={screen}
        />
      )}
    </header>
  );
}
