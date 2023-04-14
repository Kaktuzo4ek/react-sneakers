import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import styles from "./navigation.module.scss";

function Navigation({ onClose, opened, onClickCart }) {
  const navigate = useNavigate();

  const navigateToFavorites = () => {
    onClose();
    navigate("/favorites");
  };

  const navigateToCart = () => {
    onClose();
    onClickCart();
  };

  const navigateToOrders = () => {
    onClose();
    navigate("/orders");
  };

  return (
    <div className={classNames(styles.wrapper, { [styles.open]: opened })}>
      <div className={styles.close}>
        <img
          className="cu-p"
          src="img/btn-remove.svg"
          alt="Remove"
          onClick={onClose}
        />
      </div>
      <div className={styles.navigation}>
        <h1 onClick={navigateToCart}>Корзина</h1>
        <h1 onClick={navigateToFavorites}>Мої закладки</h1>
        <h1 onClick={navigateToOrders}>Мої замовлення</h1>
      </div>
      <div></div>
    </div>
  );
}

export default Navigation;
