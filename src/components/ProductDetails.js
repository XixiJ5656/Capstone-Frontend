import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../actions/productActions";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
const ProductDetailPage = (props) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.showProductDetail(props.match.params.id));
  }, [dispatch]);

  const handleSize = (e) => setSize(e.target.value);
  const handleColor = (e) => setColor(e.target.value);
  const handleQty = (e) => setQty(e.target.value);
  const addToCart = () => {
    props.history.push(
      "/cart/" +
        props.match.params.id +
        "?size=" +
        size +
        "=?color=" +
        color +
        "=?qty=" +
        qty
    );
  };

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="page">
      <button
        className="btn btn-light"
        onClick={() => props.history.push("/shop")}
      >
        <img src={back} height="40vmin" alt="Go Back" />
      </button>
      <div className="d-flex justify-content-center">
        <div className="product-details">
          <img src={product.image[0]} alt="product" />
          <img src={product.image[1]} alt="product" />
          <img src={product.image[2]} alt="product" />
          <img src={product.image[3]} alt="product" />
        </div>

        <div className="product-sidebar">
          <Link to="/shop">
            <h3>{product.name}</h3>
          </Link>
          <h5>Price:${product.price}</h5>
          <p>{product.description}</p>
          <p>
            Select Your Size:
            <select value={size} onChange={handleSize}>
              {product.size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </p>
          <p>
            Select Your Color
            <select value={color} onChange={handleColor}>
              {product.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </p>
          <p>
            Qty:
            <select value={qty} onChange={handleQty}>
              {[...Array(product.inventory).keys()].map((index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </p>
          <div className="d-flex ">
            <p>size:{size}</p>
            <p>color:{color}</p>
            <p>qty:{product.inventory > 0 ? qty : <p>Sold Out</p>}</p>
          </div>

          <div className="d-flex flex-column ">
            {product.inventory > 0 && (
              <button className="btn btn-dark mb-5" onClick={addToCart}>
                Add To Cart
              </button>
            )}

            <button
              className="btn btn-dark "
              onClick={() => props.history.push("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
