import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
const CheckoutSteps = (props) => {
  return (
    <div className="steps">
      <Link to={"/shipping"}>
        <p className={props.step1 ? "active" : ""}>Shipping</p>{" "}
      </Link>

      <Link to={"/payment"}>
        <p className={props.step2 ? "active" : ""}>Payment</p>
      </Link>

      <Link to={"/placeorder"}>
        <p className={props.step3 ? "active" : ""}>Place Order</p>
      </Link>
    </div>
  );
};

export default CheckoutSteps;
