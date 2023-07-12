import React, { useEffect, useState } from "react";
import CoinList from "./components/coinList";

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
      <div className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sticky top-0 z-50 w-full flex justify-center items-center h-24 bg-white text-gray-800 font-bold text-4xl shadow-md border border-gray-200 rounded-b-xl">
        Coin
        <span className="text-orange-500 font-sans italic py-8">Stats</span>
      </div>
      {/* main */}
      <div className="relative w-screen flex justify-center items-center">
        <div className=" w-4/5 shadow-lg pt-4 mt-4 bg-gray-50 mb-4 pb-4 rounded-lg border border-gray-200">
          <CoinList coins={coins} />
        </div>
      </div>
    </div>
  );
}
