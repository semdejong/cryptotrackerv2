import React from "react";

export default function Header() {
  return (
    <div className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sticky top-0 z-50 w-full flex justify-center items-center h-24 bg-white text-gray-800 font-bold text-4xl shadow-md border border-gray-200 rounded-b-xl">
      Coin
      <span className="text-orange-500 font-sans italic py-8">Data</span>
    </div>
  );
}
