import React from "react";
import Card from "../components/Card";

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
    return (isLoading ? [...Array(12)] : filteredSneakers).map((sneaker) =>
      sneaker ? (
        <Card
          key={sneaker.id}
          sneaker={sneaker}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
        />
      ) : (
        <Card loading={isLoading} />
      )
    );
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-20">
        <h1>
          {searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Пошук..."
          />
          {searchValue && (
            <img
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
              onClick={() => setSearchValue("")}
            />
          )}
        </div>
      </div>

      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
