import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch } from "react-redux";
import cartActions from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import next from "../assets/next.svg";
const Payment = (props) => {
  console.log(props);

  const initialUserState = {
    paymentMethod: "",
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
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Form className="card-body" onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <h2 className="form-title">Payment</h2>
            <div className="d-flex">
              <Input
                type="radio"
                name="paymentMethod"
                value="paypal"
                onChange={handleInputChange}
              />
              <label>Paypal</label>
            </div>
            <div className="d-flex">
              <Input
                type="radio"
                name="paymentMethod"
                value="creditCart"
                onChange={handleInputChange}
              />
              <label>Credit Card</label>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkButton} />
            <button className="btn btn-outline-secondary ">
              {" "}
              Next Step <img src={next} height="20vmin" alt="" />
            </button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Payment;
