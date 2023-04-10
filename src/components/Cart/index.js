import styles from "./Cart.module.scss";

function Cart() {
  return (
    <div className={styles.overlay}>
      <div className={styles.cart}>
        <h2 className="d-flex justify-between mb-30">
          Кошик <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        <div className={styles.items}>
          <div className={styles.cartItem}>
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.png)" }}
              className={styles.cartItemImg}
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Air Max 270</p>
              <b>12 999 грн.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className={styles.cartItem}>
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.png)" }}
              className={styles.cartItemImg}
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Air Max 270</p>
              <b>12 999 грн.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className={styles.cartItem}>
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.png)" }}
              className={styles.cartItemImg}
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Air Max 270</p>
              <b>12 999 грн.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default Cart;
