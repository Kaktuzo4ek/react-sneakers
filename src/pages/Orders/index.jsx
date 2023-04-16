import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";

import styles from "./orders.module.scss";
import arrowIcon from "../../assets/img/arrow.svg";
import emojiIcon from "../../assets/img/emoji2.svg";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ordersLength, setOrdersLength] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const ordersResponse = await axios.get(
          "https://6435ae47537112453fdcf3c2.mockapi.io/orders"
        );
        setOrders(ordersResponse.data);
        setOrdersLength(ordersResponse.data.length);
        console.log(ordersResponse.data.length);
      } catch (error) {
        alert("Помилка при завантаженні замовлень!");
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className={styles.content}>
      <div className="d-flex align-center justify-between mb-20">
        <h1>Мої замовлення</h1>
      </div>

      <div className={styles.container}>
        {isLoading === false && ordersLength === 0 && (
          <div className={styles.info}>
            <img width="70px" src={emojiIcon} alt="emoji" />
            <h2>Замовлень немає</h2>
            <p className="opacity-6">Ви ще не оформили жодного замовлення</p>
            <button
              onClick={() => navigate("/")}
              className={styles.greenButton}
            >
              <img src={arrowIcon} alt="Arrow" />
              Вернутися назад
            </button>
          </div>
        )}
        {(isLoading ? [...Array(1)] : orders).map((order, index) =>
          order ? (
            <div key={index}>
              <h3>Замовлення #{order.id}</h3>
              <div className={styles.order} key={order.id}>
                {order.items.map((item) => (
                  <Card key={item.id} sneaker={item} loading={isLoading} />
                ))}
              </div>
            </div>
          ) : (
            <div key={index}>
              <h3>Замовлення #{index + 1}</h3>
              <div className={styles.order}>
                {[...Array(4)].map((item) => (
                  <Card key={index} loading={isLoading} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Orders;
