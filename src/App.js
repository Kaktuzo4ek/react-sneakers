import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import axios from "axios";

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://64353e4383a30bc9ad5b9347.mockapi.io/sneakers")
      .then((res) => {
        setSneakers(res.data);
      });

    axios
      .get("https://64353e4383a30bc9ad5b9347.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });

    axios
      .get("https://6435ae47537112453fdcf3c2.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://64353e4383a30bc9ad5b9347.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
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

  const onRemoveFromCart = (id) => {
    axios.delete(`https://64353e4383a30bc9ad5b9347.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
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
          exact
          element={
            <Home
              sneakers={sneakers}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites
              favorites={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
