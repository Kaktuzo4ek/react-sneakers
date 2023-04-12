import styles from "./Cart.module.scss";

function Cart({ onClose, onRemove, items = [] }) {
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
              <div>
                <div key={item.id} className={styles.cartItem}>
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
          <div className={styles.cartEmpty}>
            <img
              className="mb-20"
              width="120px"
              height="120px"
              src="/img/empty-cart.jpg"
              alt="Empty"
            />
            <h2>Кошик порожній</h2>
            <p className="opacity-6">
              Додайте хоча б одну пару кросівок, щоб здійснити замовлення.
            </p>
            <button onClick={onClose} className={styles.greenButton}>
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернутися назад
            </button>
          </div>
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
            <button className={styles.greenButton}>
              Оформити замовлення <img src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
