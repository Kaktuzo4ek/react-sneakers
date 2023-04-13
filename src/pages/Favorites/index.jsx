import React from "react";

import Card from "../../components/Card";
import AppContext from "../../context";

import styles from "./favorites.module.scss";

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } =
    React.useContext(AppContext);

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1>Мої закладки</h1>
      </div>

      <div className={styles.sneakers}>
        {favorites.map((sneaker) => (
          <Card
            key={sneaker.id}
            sneaker={sneaker}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
