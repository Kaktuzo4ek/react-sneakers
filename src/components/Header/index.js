import React from "react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss";
import logoIcon from "../../assets/img/logo.svg";
import cartIcon from "../../assets/img/cart.svg";
import heartIcon from "../../assets/img/heart.svg";
import userIcon from "../../assets/img/user.svg";
import hamburgerIcon from "../../assets/img/hamburger.png";

function Header({ onClickCart, onClickNav }) {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className={styles.headerLeft} onClick={() => navigate("")}>
        <img width={40} height={40} src={logoIcon} alt="logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин кращих кросівок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-20 cu-p" onClick={onClickCart}>
          <img width={25} height={25} src={cartIcon} alt="cart" />
          <span>{totalPrice} грн.</span>
        </li>
        <li className="cu-p mr-20">
          <img
            width={25}
            height={25}
            src={heartIcon}
            alt="liked"
            onClick={() => navigate("favorites")}
          />
        </li>
        <li className="cu-p">
          <img
            width={25}
            height={25}
            src={userIcon}
            alt="user"
            onClick={() => navigate("orders")}
          />
        </li>
      </ul>
      <ul className={styles.hamburger}>
        <li>
          <img
            width={25}
            height={25}
            src={hamburgerIcon}
            alt="user"
            onClick={onClickNav}
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
