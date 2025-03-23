import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ShopContextProvider from "./Components/Context/ShopContext";
import "./index.css";
import Checkout from "./Components/CheckOut/CheckOut";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
);
console.warn = () => {};
