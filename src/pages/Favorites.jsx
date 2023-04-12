import Card from "../components/Card";

function Favorites({ favorites, onAddToFavorite }) {
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
