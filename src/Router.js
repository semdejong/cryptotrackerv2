import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Coin from "./pages/coin";
import Home from "./pages/home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:coinId" element={<Coin />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
