import React, { useState, useEffect } from "react";
import axios from "axios";
// import ProductsRow from "../components/ProductsRow";
// import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/app/products")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        return error;
      });
  }, []);
  console.log(products);
  return (
    <div className="shop-page">
      <ul className="products">
        {products.map((product) => (
          <li key={product.id}>
            <div className="product">
              <Link to={"/product/" + product.id}>
                <img className="product-image" src={product.image} alt="" />
              </Link>
              <div className="product-name">
                <Link to={"/product/" + product.id}>{product.name}</Link>
              </div>
              <strong>{product.price}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
