import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useDispatch } from "react-redux";
import cartActions from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import paypal from "../assets/paypal.svg";
import creditcard from "../assets/credit-card.svg";

import next from "../assets/next.svg";

const Payment = (props) => {
  console.log(props);

  const initialUserState = {
    paymentMethod: "",
    number: "",
    name: "",
    expiration: "",
    cvc: "",
    focus: "",
  };
  const [payment, setPayment] = useState(initialUserState);
  const [successful, setSuccessful] = useState(false);
  const form = useRef();
  const checkButton = useRef();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleFocus = (e) => {
    setPayment({ ...payment, focus: e.target.name });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    const data = {
      paymentMethod: payment.paymentMethod,
    };
    console.log(data);
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      dispatch(cartActions.savePayment(data));
      props.history.push("/placeorder");
    }
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Form className="card-body" onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <h2 className="form-title">Payment</h2>
            <div className="card-body">
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Paypal"
                  onChange={handleInputChange}
                />
                <label className="payment-label">
                  <img src={paypal} height="120vmin" alt="" />
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  onChange={handleInputChange}
                />
                <label className="payment-label">
                  <img src={creditcard} height="100vmin" alt="" />
                </label>
              </div>
            </div>
            {payment.paymentMethod === "Credit Card" && (
              <div className="form">
                <div className="mb-5">
                  <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={payment.number}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={payment.name}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                  />
                  <input
                    type="text"
                    name="expiration"
                    placeholder="MM/YY"
                    value={payment.expiration}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                  />
                  <input
                    type="tel"
                    name="cvc"
                    placeholder="CVV/CVC"
                    value={payment.cvc}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                  />
                </div>
                <Cards
                  number={payment.number}
                  name={payment.name}
                  expiration={payment.expiration}
                  cvc={payment.cvc}
                  focused={payment.focus}
                />
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkButton} />
            <div className="d-flex align-items-center flex-column">
              <button className="btn btn-outline-secondary ">
                {" "}
                Next Step <img src={next} height="20vmin" alt="" />
              </button>
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your information with anyone else.
              </small>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Payment;
