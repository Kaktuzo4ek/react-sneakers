import styles from "./Card.module.scss";

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <div className={styles.image}>
        <img
          width={133}
          height={112}
          src={props.sneaker.imageUrl}
          alt="Sneaker"
        />
      </div>
      <h5>{props.sneaker.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Ціна:</span>
          <b>{props.sneaker.price} грн.</b>
        </div>
        <button className={styles.button}>
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  );
}

export default Card;
