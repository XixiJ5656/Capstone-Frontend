import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import cartActions from "../actions/cartActions";
const OrderConfirmation = (props) => {
  const { order } = useSelector((state) => state.orderManage);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const clearOrder = () => {
    dispatch(cartActions.removeAllItems());
    props.history.push("/shop");
  };
  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="card">
        <div className="form">
          <h3 className="card-title">
            Order NO.:<strong className="order-num">{order.id}</strong>
          </h3>

          <div className="card-body ">
            <h4 className="form-title">Order Items:</h4>
            <table>
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Color</th>
                  <th scope="col">Size</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="product-row" key={item.id}>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5>
              Subtotal ({" "}
              {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
              Items) : ${" "}
              {cartItems.reduce(
                (a, c) =>
                  (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2),
                0
              )}
            </h5>
          </div>
          <div className="card-body">
            <p>
              Shipping Address:{order.address},{order.city},{order.state},
              {order.zipcode},{order.country}
            </p>
            <p>Payment:{order.payment}</p>
          </div>
          <button className="btn btn-dark btn-block" onClick={clearOrder}>
            Close and Back to shop
          </button>
        </div>
      </div>
    );
  }
};

export default OrderConfirmation;
