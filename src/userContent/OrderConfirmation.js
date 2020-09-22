import React from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
const OrderConfirmation = (props) => {
  const { order } = useSelector((state) => state.orderManage);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(order);
  const clearOrder = () => {
    Cookie.remove("cartItems");
    props.history.push("/shop");
  };

  return (
    <div className="page">
      <div className="form">
        <h2 className="form-title">Order Confirmation </h2>

        <div className="card">
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
        <div className="card">
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
};

export default OrderConfirmation;
