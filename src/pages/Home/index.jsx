import React from "react";

import Card from "../../components/Card";

import styles from "./home.module.scss";

function Home({
  sneakers,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) {
  const renderItems = () => {
    const filteredSneakers = sneakers.filter((sneaker) =>
      sneaker.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filteredSneakers).map(
      (sneaker, index) =>
        sneaker ? (
          <Card
            key={sneaker.id}
            sneaker={sneaker}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
          />
        ) : (
          <Card key={index} loading={isLoading} />
        )
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1>
          {searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}
        </h1>
        <div className={styles.searchBlock}>
          <img src="img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Пошук..."
          />
          {searchValue && (
            <img
              className={styles.clear}
              src="img/btn-remove.svg"
              alt="Remove"
              onClick={() => setSearchValue("")}
            />
          )}
        </div>
      </div>

      <div className={styles.sneakers}>{renderItems()}</div>
    </div>
  );
}

export default Home;
