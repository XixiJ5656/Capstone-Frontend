import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = (props) => {
  console.log(props.match.params);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/app/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const product = products.find((item) => item.id == props.match.params.id);
  console.log(product);
  return (
    <div className="product-details">
      <img src="" alt="product" />
      <ul className="product-info">
        <li>product name</li>
        <li> available color</li>
        <li> avalilabe size</li>
        <li>product discription</li>
      </ul>
      <ul className="product-actions">
        <li>price:product price</li>
        <li>
          Qty:{" "}
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </li>
        <li>
          <button>Add To Cart</button>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetails;
