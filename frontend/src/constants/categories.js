import coffeeIcon from '../assets/svgs/coffee_cup.svg';
import teaIcon from '../assets/svgs/tea_icon.svg';
import style from '../styles/ProductPage.module.css';

export const categoryMap = {
  1: {
    name: 'Coffee',
    icon: coffeeIcon,
    className: style.coffeeIconContainer,
    productNameStyle: style.coffeeTitle,
    attributes: [
      { label: 'Origin', key: 'origin' },
      { label: 'Roast Level', key: 'roast_level' },
      { label: 'Format', key: 'format' },
      { label: 'Weight', key: 'weight', type: 'numeric' },
    ],
  },
  2: {
    name: 'Tea',
    icon: teaIcon,
    className: style.teaIconContainer,
    productNameStyle: style.teaTitle,
    attributes: [
      { label: 'Type', key: 'type' },
      { label: 'Origin', key: 'origin' },
      { label: 'Format', key: 'format' },
      { label: 'Caffeine Level', key: 'caffeine_level' },
      { label: 'Weight', key: 'weight', type: 'numeric' },
    ],
  },
};
