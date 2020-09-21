import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../actions/productActions";

import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = (props) => {
  console.log(props);
  const { products } = useSelector((state) => state.productManage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <div className="shop-page">
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <Link to={"/product/" + product.id}>
              <img className="product-image" src={product.image[0]} alt="" />
            </Link>
            <div className="product-name">
              <Link to={"/product/" + product.id}>{product.name}</Link>
            </div>
            <strong>{product.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
