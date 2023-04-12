import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/" exact="true">
        <div className={styles.headerLeft}>
          <img width={40} height={40} src="/img/logo.svg" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин кращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-20 cu-p" onClick={props.onClickCart}>
          <img width={25} height={25} src="/img/cart.svg" alt="cart" />
          <span>1205 грн.</span>
        </li>
        <li className="cu-p mr-20">
          <Link to="/favorites">
            <img width={25} height={25} src="/img/heart.svg" alt="liked" />
          </Link>
        </li>
        <li className="cu-p">
          <img width={25} height={25} src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
