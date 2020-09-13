import React from "react";
import "./Product.css";

const Product = () => {
  return (
    <div className="product">
      <img
        className="product-image"
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="NOT SHOW"
      />
      <h4>Ribbed Turtleneck</h4>
      <strong>$24.99</strong>
      <br />
      <br />
      <button>view details</button>
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
