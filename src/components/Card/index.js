import React from "react";
import classNames from "classnames";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({ sneaker, onFavorite, onPlus, loading = false }) {
  const { isExistInCart, isExistInFavorites } = React.useContext(AppContext);

  return (
    <div className={classNames(styles.card, { [styles.placeholder]: loading })}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={220}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                src={
                  isExistInFavorites(sneaker.gId)
                    ? "/img/liked.svg"
                    : "/img/unliked.svg"
                }
                alt="Unliked"
                onClick={() => onFavorite(sneaker)}
              />
            </div>
          )}
          <div className={styles.image}>
            <img
              width={133}
              height={112}
              src={sneaker.imageUrl}
              alt="Sneaker"
            />
          </div>
          <h5>{sneaker.title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Ціна:</span>
              <b>{sneaker.price} грн.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                src={
                  isExistInCart(sneaker.gId)
                    ? "/img/btn-checked.svg"
                    : "/img/btn-plus.svg"
                }
                alt="Plus"
                onClick={() => onPlus(sneaker)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
