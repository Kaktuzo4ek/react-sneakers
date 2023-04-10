import Card from "./components/Card";
import Header from "./components/Header";
import Cart from "./components/Cart";

const sneakersArray = [
  {
    title: "Чоловічі Кросівки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/img/sneakers/1.png",
  },
  {
    title: "Чоловічі Кросівки Nike Air Max 270",
    price: 15600,
    imageUrl: "/img/sneakers/2.png",
  },
  {
    title: "Чоловічі Кросівки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "/img/sneakers/3.png",
  },
  {
    title: "Кросівки Puma X Aka Boku Future Rider",
    price: 8999,
    imageUrl: "/img/sneakers/4.png",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Cart />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-20">
          <h1>Всі кросівки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Пошук..." />
          </div>
        </div>

        <div className="sneakers">
          {sneakersArray.map((sneaker) => (
            <Card key={sneaker.title} sneaker={sneaker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
