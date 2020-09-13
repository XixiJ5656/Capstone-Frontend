import React from "react";
import Product from "./Product";
import "./Product.css";
const ProductsRow = () => {
  return (
    <div className="product-row">
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default ProductsRow;
