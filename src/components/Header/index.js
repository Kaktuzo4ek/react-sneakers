import React from "react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss";

function Header(props) {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className={styles.headerLeft} onClick={() => navigate("/")}>
        <img width={40} height={40} src="img/logo.svg" alt="logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин кращих кросівок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-20 cu-p" onClick={props.onClickCart}>
          <img width={25} height={25} src="img/cart.svg" alt="cart" />
          <span>{totalPrice} грн.</span>
        </li>
        <li className="cu-p mr-20">
          <img
            width={25}
            height={25}
            src="img/heart.svg"
            alt="liked"
            onClick={() => navigate("/favorites")}
          />
        </li>
        <li className="cu-p">
          <img
            width={25}
            height={25}
            src="img/user.svg"
            alt="user"
            onClick={() => navigate("/orders")}
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
