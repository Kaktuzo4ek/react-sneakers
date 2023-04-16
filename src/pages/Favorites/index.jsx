import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import AppContext from "../../context";

import styles from "./favorites.module.scss";
import arrowIcon from "../../assets/img/arrow.svg";
import emojiIcon from "../../assets/img/emoji.svg";

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } =
    React.useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1>Мої закладки</h1>
      </div>

      {favorites.length > 0 ? (
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
      ) : (
        <div className={styles.info}>
          <img width="70px" src={emojiIcon} alt="emoji" />
          <h2>Закладок немає</h2>
          <p className="opacity-6">Ви нічого не добавили у ваші закладки</p>
          <button onClick={() => navigate("/")} className={styles.greenButton}>
            <img src={arrowIcon} alt="Arrow" />
            Вернутися назад
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
