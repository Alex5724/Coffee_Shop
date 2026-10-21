import inStockIcon from '../assets/svgs/checked_circle.svg';
import criticalStockIcon from '../assets/svgs/warning.svg';
import noStockIcon from '../assets/svgs/x_circle.svg';
import style from '../styles/StockCheck.module.css';

export const statusMap = {
  'In stock': {
    icon: inStockIcon,
    className: style.inStock_container,
    iconClass: style.inStockIcon,
  },
  'Low stock': {
    icon: criticalStockIcon,
    className: style.criticalStock_container,
    iconClass: style.criticalStockIcon,
  },
  'Out of stock': {
    icon: noStockIcon,
    className: style.noStock_container,
    iconClass: style.noStockIcon,
  },
};
