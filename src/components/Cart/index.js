import React from "react";
import styles from "./Cart.module.scss";
import Info from "../Info";
import AppContext from "../../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
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
        const item = cartItems[i];
        await axios.delete(
          `https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Помилка при створенні замовлення :(");
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.cart}>
        <h2 className="d-flex justify-between mb-30">
          Кошик{" "}
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
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
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Info
            imageUrl={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
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
                <b>21 498 грн. </b>
              </li>
              <li>
                <span>Податок 5%:</span>
                <div></div>
                <b>1074 грн. </b>
              </li>
            </ul>
            <button
              disabled={isLoading}
              className={styles.greenButton}
              onClick={onClickMakeOrder}
            >
              Оформити замовлення <img src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
