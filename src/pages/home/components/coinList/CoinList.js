import React from "react";
import { Link } from "react-router-dom";

export default function CoinList({ coins }) {
  return (
    <div className="w-full flex flex-col space-y-4 items-center">
      {coins.map((coin) => (
        <Link to={"/" + coin.symbol} className=" w-full flex justify-center">
          <div
            onClick={() => {}}
            key={coin.id}
            className="h-20 shadow md:mx-4 w-full flex justify-between items-center rounded-md bg-white border border-gray-200 px-4 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
            style={{ width: "95%" }}
          >
            {/* Image, Name, Ticker */}
            <div className="flex items-center md:w-48">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <h1 className="md:text-xl font-bold md:ml-3 ml-2">{coin.name}</h1>
              <p className="text-sm ml-2 text-gray-400">{coin.symbol}</p>
            </div>
            {/* current change */}
            <div className="hidden md:flex">
              <p className="text-sm font-bold text-left">
                {coin.price_change_percentage_24h.toFixed(2)}% | $
                {nFormatter(coin.market_cap, 1)}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-right w-32">
                ${coin.current_price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
