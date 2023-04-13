import React from "react";

import AppContext from "../../context";

import styles from "./info.module.scss";

const Info = ({ imageUrl, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={styles.info}>
      <img className="mb-20" width="120px" src={imageUrl} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        className={styles.greenButton}
      >
        <img src="img/arrow.svg" alt="Arrow" />
        Вернутися назад
      </button>
    </div>
  );
};

export default Info;
