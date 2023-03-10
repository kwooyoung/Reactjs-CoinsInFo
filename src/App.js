import { useState, useEffect } from "react";
/*useEffect*/

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const KW = Math.floor(price * 1222).toLocal;

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      //패치한 APi정보를 json으로 변경
      .then((json) => {
        setCoins(json);
        setLoading(false);
        //setCoins에 json으로 변경한 정보를 넣으면서 로딩 null값으로 변경
      });
  }, []);

  const handleInput = (event) => {
    setAmount(event.target.value);
  };
  console.log("amount", amount);

  const handlePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(coins[value].quotes.USD.price);
  };
  const kw = Math.floor(price * 1222).toLocaleString();

  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handlePrice}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.rank - 1}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <h2>
          {" "}
          1COIN = {price} USD {`(약 ${kw}원)`}
        </h2>
      </div>
      <span>
        <input
          type="text"
          placeholder="USD"
          value={amount}
          onChange={handleInput}
        />{" "}
        USD
      </span>
      <span> = </span>
      <strong>
        {amount / price} {amount / price <= 1 ? "COIN" : "COINS"}
      </strong>
      <div>
        <hr />
        <span>
          <input
            type="text"
            placeholder="USD"
            value={amount}
            onChange={handleInput}
          />{" "}
          원
        </span>
        <span> = </span>
        <strong>
          {amount / price / 1222} {amount / price <= 1 ? "COIN" : "COINS"}
        </strong>
      </div>
    </div>
  );
}

export default App;
