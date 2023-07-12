import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { BsArrowLeft } from "react-icons/bs";

import "./animation.css";
import { Link, useParams } from "react-router-dom";
import useNumberFormatter from "../../hooks/useNumberFormatter";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Coin() {
  const [coin, setCoin] = useState(null);
  const [coinPrices, setCoinPrices] = useState(null);

  const { coinId } = useParams();
  const { nFormatter } = useNumberFormatter();

  console.log(coin, coinPrices);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?vs_currency=usd`)
      .then((res) => res.json())
      .then((data) => setCoin(data));
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((data) =>
        setCoinPrices(
          data.prices.map((price) => {
            const [timestamp, p] = price;
            const date =
              new Date(timestamp).getDate() +
              "/" +
              new Date(timestamp).getMonth();

            return {
              Date: date,
              Price: p,
            };
          })
        )
      );
  }, []);

  if (coin === null || coinPrices === null) return <h1>Loading...</h1>;

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-12 w-full flex p-4  items-center mt-4 justify-between">
        <div className="flex items-center space-x-6">
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
        <div className="font-thin text-lg flex space-x-2">
          <span className="">{nFormatter(coin.market_data.ath.usd, 2)}</span>
          {/* {nFormatter(
            (coin.market_data.high_24h.usd * 100) /
              (coin.market_data.price_change_percentage_7d_in_currency.usd +
                100),
            2
          )} */}
          <span>|</span>
          <span>{nFormatter(coin.market_data.high_24h.usd, 2)}</span>
        </div>
      </div>
      <div className=" w-full flex md:flex-row flex-col justify-between space-x-6 mt-6">
        <div className="h-full flex items-center justify-center md:m-0 m-4">
          <LineChart
            width={450}
            height={225}
            data={coinPrices}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis
              type="number"
              dataKey="Price"
              domain={["auto", "auto"]}
              includeHidden
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" />
          </LineChart>
        </div>
        <div
          className="font-thin px-4"
          dangerouslySetInnerHTML={{ __html: coin.description.en }}
        ></div>
      </div>
    </div>
  );
}
