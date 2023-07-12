import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { BsArrowLeft } from "react-icons/bs";

import "./animation.css";
import { Link, useParams } from "react-router-dom";

export default function Coin() {
  const [coin, setCoin] = useState(null);
  const [coinPrices, setCoinPrices] = useState(null);

  const { coinId } = useParams();

  console.log(coin, coinPrices);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?vs_currency=usd`)
      .then((res) => res.json())
      .then((data) => setCoin(data));
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((data) => setCoinPrices(data));
  }, []);

  if (coin === null || coinPrices === null) return <h1>Loading...</h1>;

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-12 w-full flex p-4 space-x-6 items-center mt-4">
        <Link to="/" className="cursor-pointer hover:animate-bounceX">
          <span className="text-4xl">
            <BsArrowLeft />
          </span>
        </Link>
        <div className="flex justify-center items-center">
          <img src={coin.image.large} alt={coin.name} className="w-10 h-10" />
          <span className=" ml-1 mr-1 h-14 flex flex-col justify-start text-gray-400">
            <span>#{coin.market_cap_rank}</span>
          </span>
          <h1 className="md:text-xl font-bold md:ml-3 ml-2">{coin.name}</h1>
          <p className="text-sm ml-2 text-gray-400">{coin.symbol}</p>
        </div>
      </div>
    </div>
  );
}
