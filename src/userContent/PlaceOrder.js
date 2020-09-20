import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../actions/cartActions";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  useEffect(() => {});

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const removeItem = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <section className="container mb-1">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1>Place Order</h1>
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
            <button onClick={() => props.hisotry.push("/shipping")}>
              Add Address
            </button>
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
            {/* <Link to="/shipping"/>
              <p>Add Your Address</p>
            </Link> */}
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
            <th scope="col">Totoal Price For This Item</th>
            <th></th>
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
                <td>Qty:{item.qty}</td>

                <td>${item.price * item.qty}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    REMOVE ITEM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="d-flex justify-content-between mt-5">
        {/* <h3>
          Subtotal ({" "}
          {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items)
          : $ {(cartItems.reduce((a, c) => parseInt(a + c.price * c.qty)), 0)}
        </h3> */}

        <button
          onClick={() => props.history.push("signin?redirect=/checkout")}
          className="btn btn-dark btn-lg"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export default PlaceOrder;
