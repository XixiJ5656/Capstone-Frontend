import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../actions/productActions";

import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.listProducts());

    return () => {};
  }, []);

  console.log(products);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product.id}>
          <div className="product">
            <Link to={"/product/" + product.id}>
              <img className="product-image" src={product.image[0]} alt="" />
            </Link>
            <div className="product-name">
              <Link to={"/product/" + product.id}>{product.name}</Link>
            </div>
            <strong>{product.price}</strong>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Shop;
