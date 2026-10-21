import style from '../styles/Header.module.css';
import plusSVG from '../assets/svgs/add_plus.svg';
import menuSVG from '../assets/svgs/menu.svg';
import packageSVG from '../assets/svgs/package.svg';
import plusSmallScreen from '../assets/svgs/add_plus_small_screen.svg';
import GenerateHeaderOrFooter from './GenerateHeaderOrFooter';

export default function Footer({ screen }) {
  return (
    <footer className={style.footer}>
      {screen.mediumScreen && (
        <GenerateHeaderOrFooter
          style={style}
          plusSVG={plusSVG}
          plusSmallScreen={plusSmallScreen}
          menuSVG={menuSVG}
          packageSVG={packageSVG}
          screen={screen}
        />
      )}
    </footer>
  );
}
