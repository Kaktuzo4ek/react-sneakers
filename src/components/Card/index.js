import React from "react";
import styles from "./Card.module.scss";

function Card({ sneaker, onFavorite, onPlus, favorited = false }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus(sneaker);
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite(sneaker);
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorited ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
          onClick={onClickFavorite}
        />
      </div>
      <div className={styles.image}>
        <img width={133} height={112} src={sneaker.imageUrl} alt="Sneaker" />
      </div>
      <h5>{sneaker.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Ціна:</span>
          <b>{sneaker.price} грн.</b>
        </div>
        <img
          className={styles.plus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
}

export default Card;
