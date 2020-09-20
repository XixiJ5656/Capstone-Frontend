import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../actions/cartActions";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import orderActions from "../actions/orderActions";
const PlaceOrder = (props) => {
  console.log(props);

  const initialOrderState = {
    id: null,
    username: "",
    shipping: {},
    payment: {},
    orderItems: [],
    delivered: false,
  };

  const { cartItems, shipping, payment } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [order] = useState(initialOrderState);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  const submitOrder = (e) => {
    e.preventDefault();
    setSuccessful(false);
    const data = {
      username: user.username,
      shipping: shipping,
      payment: payment,
      orderItems: cartItems,
      delivered: order.delivered,
    };
    console.log(data);
    dispatch(orderActions.saveOrder(data));
    props.history.push("/order-conformation");
  };

  return (
    <section className="container mb-1">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h2>Please Check Your Order Details</h2>
      <div>
        <h5>Shipping Address</h5>
        {shipping ? (
          <div>
            {shipping.address},{shipping.city},{shipping.state},
            {shipping.zipcode},{shipping.country}
          </div>
        ) : (
          <div>
            <h3>No Address</h3>

            <Link to="/shipping">
              <strong>Add Address</strong>
            </Link>
          </div>
        )}
      </div>
      <div>
        <h5>Payment Details</h5>
        {payment ? (
          payment.paymentMethod
        ) : (
          <div>
            <h3>No Address</h3>
            <Link to="/payment">
              <strong>Add Payment Information</strong>
            </Link>
          </div>
        )}
      </div>
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
            <th scope="col">Totoal Price/ Item</th>
          </tr>
        </thead>

        {cartItems.length === 0 ? (
          <h2 className="text-center">Cart is empty</h2>
        ) : (
          <tbody>
            {cartItems.map((item) => (
              <tr className="product-row" key={item.id}>
                <td>
                  <Link to={"/product/" + item.id}>
                    <img src={item.image} alt="" width="100px" />
                  </Link>
                </td>
                <td>
                  <Link to={"/product/" + item.id}>
                    <p>{item.name}</p>
                  </Link>
                </td>

                <td>${item.price}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>#{item.qty}</td>

                <td>${item.price * item.qty}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="d-flex justify-content-between mt-5">
        <h3>
          Subtotal ({" "}
          {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} Items)
          : ${" "}
          {cartItems.reduce(
            (a, c) => (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2),
            0
          )}
        </h3>
        <button
          onClick={submitOrder}
          className="btn btn-dark btn-lg"
          disabled={cartItems.length === 0 || !shipping || !payment || !user}
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export default PlaceOrder;
