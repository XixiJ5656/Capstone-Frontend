import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import listProducts from "../actions/productAction";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  // const [products, setProducts] = useState([]);
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    return () => {
      //
    };
  }, []);
  //   axios
  //     .get("http://localhost:8080/api/app/products")
  //     .then((response) => {
  //       console.log(response);
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }, []);

  console.log(products);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    // return (
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
  );
};

export default Shop;
