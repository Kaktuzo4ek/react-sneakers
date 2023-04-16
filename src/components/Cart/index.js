import React from "react";
import axios from "axios";
import classNames from "classnames";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Cart.module.scss";
import removeIcon from "../../assets/img/btn-remove.svg";
import emptyCartIcon from "../../assets/img/empty-cart.jpg";
import completedOrderIcon from "../../assets/img/complete-order.jpg";
import arrowIcon from "../../assets/img/arrow.svg";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickMakeOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6435ae47537112453fdcf3c2.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const id = cartItems.indexOf(cartItems[i]) + 1;
        await axios.delete(
          `https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Помилка при створенні замовлення :(");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className={classNames(styles.overlay, { [styles.open]: opened })}>
      <div className={styles.cart}>
        <h2 className="d-flex justify-between mb-30">
          Кошик{" "}
          <img
            className="cu-p"
            src={removeIcon}
            alt="Remove"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id}>
                <div className={styles.cartItem}>
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className={styles.cartItemImg}
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{item.title}</p>
                    <b>{item.price} грн.</b>
                  </div>
                  <img
                    className={styles.removeBtn}
                    src={removeIcon}
                    alt="Remove"
                    onClick={() => onRemove(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Info
            imageUrl={isOrderComplete ? completedOrderIcon : emptyCartIcon}
            title={isOrderComplete ? "Замовлення оформлено!" : "Кошик порожній"}
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} незабаром буде передано кур'єрській службі доставки`
                : "Додайте хоча б один товар, щоб оформити замовлення"
            }
          />
        )}
        {items.length > 0 && (
          <div className={styles.cartTotalBlock}>
            <ul>
              <li>
                <span>Всього:</span>
                <div></div>
                <b>{totalPrice} грн. </b>
              </li>
              {/* <li>
                <span>На ЗСУ 5%:</span>
                <div></div>
                <b>{Math.round((totalPrice / 100) * 5)} грн. </b>
              </li> */}
            </ul>
            <button
              disabled={isLoading}
              className={styles.greenButton}
              onClick={onClickMakeOrder}
            >
              Оформити замовлення <img src={arrowIcon} alt="Arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
