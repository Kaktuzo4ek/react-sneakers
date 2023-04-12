import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

import axios from "axios";

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const favoritesResponse = await axios.get(
        "https://6435ae47537112453fdcf3c2.mockapi.io/favorites"
      );

      const cartResponse = await axios.get(
        "https://64353e4383a30bc9ad5b9347.mockapi.io/cart"
      );

      const sneakersResponse = await axios.get(
        "https://64353e4383a30bc9ad5b9347.mockapi.io/sneakers"
      );

      setFavorites(favoritesResponse.data);
      setCartItems(cartResponse.data);
      setSneakers(sneakersResponse.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => item.id === obj.id)) {
      axios.delete(
        `https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://64353e4383a30bc9ad5b9347.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((f) => f.id === obj.id)) {
        axios.delete(
          `https://6435ae47537112453fdcf3c2.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        console.log(obj);
        const { data } = await axios.post(
          "https://6435ae47537112453fdcf3c2.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не вдалося добавити в закладки");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isExistInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const isExistInFavorites = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cartItems,
        favorites,
        isExistInCart,
        isExistInFavorites,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Cart
            items={cartItems}
            onRemove={onRemoveFromCart}
            onClose={() => setCartOpened(false)}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            exact="true"
            element={
              <Home
                sneakers={sneakers}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" exact="true" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
