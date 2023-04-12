import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-20">
        <h1>Мої закладки</h1>
      </div>

      <div className="sneakers">
        {favorites.map((sneaker) => (
          <Card
            key={sneaker.id}
            sneaker={sneaker}
            favorited={true}
            onFavorite={onAddToFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
