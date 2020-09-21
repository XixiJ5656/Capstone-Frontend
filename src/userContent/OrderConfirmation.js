import React from "react";
import { useSelector } from "react-redux";

const OrderConfirmation = () => {
  const { order } = useSelector((state) => state.orderManage);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(order);

  return (
    <div>
      <h2>Order Confimation for {order.username}</h2>
      <div>
        <h4>Order Items:</h4>
        <table>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
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
        <h3>
          Subtotal ({" "}
          {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} Items)
          : ${" "}
          {cartItems.reduce(
            (a, c) => (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2),
            0
          )}
        </h3>
      </div>
      <p>
        Shipping Address:{order.address},{order.city},{order.state},
        {order.zipcode},{order.country}
      </p>
    </div>
  );
};

export default OrderConfirmation;
