import React from "react";
import ProductsRow from "../components/ProductsRow";
import "./Shop.css";
const Shop = () => {
  return (
    <div className="shop-page">
      <div>
        <h1>this is my shop page. list all the products here</h1>
        <ProductsRow />
        <ProductsRow />
        <ProductsRow />
      </div>
    </div>
  );
};

export default Shop;
