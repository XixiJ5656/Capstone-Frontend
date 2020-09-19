import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../actions/productActions";
import { Link } from "react-router-dom";

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
    <div className="product-details">
      <Link to="/shop">
        <h2> Back to Shop</h2>
      </Link>
      <ul className="product-info">
        <li>{product.name}</li>
        <li>{product.description}</li>
      </ul>
      <div className="product-detail-image">
        <img src={product.image[0]} alt="product" />
        <img src={product.image[1]} alt="product" />
        <img src={product.image[2]} alt="product" />
        <img src={product.image[3]} alt="product" />
        <ul className="product-actions">
          <li>Price:${product.price}</li>
          <li>
            Select Your Size:
            <select value={size} onChange={handleSize}>
              {product.size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </li>
          <li>
            Select Your Color
            <select value={color} onChange={handleColor}>
              {product.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </li>
          <li>
            Qty:
            <select value={qty} onChange={handleQty}>
              {[...Array(product.inventory).keys()].map((index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div className="preorder-confirmation">
        <p>size:{size}</p>
        <p>color:{color}</p>
        <p>qty:{product.inventory > 0 ? qty : <p>Sold Out</p>}</p>
      </div>
      <ul>
        <li>
          {product.inventory > 0 && (
            <button onClick={addToCart}>Add To Cart</button>
          )}

          <Link to="/shop">
            <button>Continue Shopping</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetailPage;
