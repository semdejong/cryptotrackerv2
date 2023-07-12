import React, { useEffect, useState } from "react";
import CoinList from "./components/coinList";
import Header from "../../components/header";

export default function Home() {
  const [coins, setCoins] = useState([]);

  console.log(coins);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  return (
    <div className="w-screen flex flex-col">
      <Header />
      {/* main */}
      <div className="relative w-screen flex justify-center items-center">
        <div className=" md:w-4/5 shadow-lg pt-4 mt-4 bg-gray-50 mb-4 pb-4 rounded-lg border border-gray-200">
          <CoinList coins={coins} />
        </div>
      </div>
    </div>
  );
}
