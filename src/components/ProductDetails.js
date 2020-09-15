import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions from "../actions/productActions";
import { Link } from "react-router-dom";

const ProductDetailPage = (props) => {
  console.log(props.match.params.id);
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.showProductDetail(props.match.params.id));
    return () => {};
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product-details">
      <div>
        <img src={product.image[0]} alt="product" />
        <img src={product.image[1]} alt="product" />
      </div>

      <ul className="product-info">
        <li>{product.name}</li>

        <li>{product.description}</li>
      </ul>
      <div>
        <img src={product.image[2]} alt="product" />
        <img src={product.image[3]} alt="product" />
      </div>
      <ul className="product-actions">
        <li>PRICE:${product.price}</li>
        <li>Select Your Size {product.size}</li>
        <li>Select Your Color {product.color}</li>
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
          <Link to="/shop">
            <button>Back to Shop</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetailPage;
