import React from "react";
import axios from "axios";

import Card from "../../components/Card";

import styles from "./orders.module.scss";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const ordersResponse = await axios.get(
          "https://6435ae47537112453fdcf3c2.mockapi.io/orders"
        );
        setOrders(ordersResponse.data);
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
