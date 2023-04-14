import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";
import Navigation from "./components/Navigation";
import image from "./a";

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [navOpened, setNavOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
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
      } catch (error) {
        alert("Помилка при завантаженні даних!");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.gId === obj.gId);
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.gId !== obj.gId));
        axios.delete(
          `https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://64353e4383a30bc9ad5b9347.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Помилка при додаванні товару в кошик!");
      console.error(error);
    }
  };

  const onRemoveFromCart = (obj) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.gId !== obj.gId));
      const id = cartItems.find((item) => item.gId === obj.gId).id;
      console.log(id);
      axios.delete(`https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${id}`);
    } catch (error) {
      alert("Помилка при видаленн товару!");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      setFavorites((prev) => prev.filter((item) => item.gId !== obj.gId));
      const findItem = favorites.find((item) => item.gId === obj.gId);
      if (findItem) {
        axios.delete(
          `https://6435ae47537112453fdcf3c2.mockapi.io/favorites/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://6435ae47537112453fdcf3c2.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не вдалося добавити в закладки");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isExistInCart = (id) => {
    return cartItems.some((item) => item.gId === id);
  };

  const isExistInFavorites = (id) => {
    return favorites.some((item) => item.gId === id);
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cartItems,
        favorites,
        isExistInCart,
        isExistInFavorites,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Cart
          items={cartItems}
          onRemove={onRemoveFromCart}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <Header
          onClickCart={() => setCartOpened(true)}
          onClickNav={() => setNavOpened(true)}
        />
        <Navigation
          opened={navOpened}
          onClose={() => setNavOpened(false)}
          onClickCart={() => setCartOpened(true)}
        />

        <Routes>
          <Route
            path="/"
            exact
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
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
