import { useOutletContext } from 'react-router';

export default function StockCheck({ available, status_map }) {
  const status = status_map[available];

  const { screen } = useOutletContext();

  return (
    <span className={status.className}>
      {!screen.smallScreen && (
        <img
          src={status.icon}
          alt=""
          className={status.iconClass}
          aria-hidden="true"
        />
      )}

      <p>{available}</p>
    </span>
  );
}
