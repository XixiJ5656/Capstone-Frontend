import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import cartActions from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-warning" role="alert">
        This field is required!
      </div>
    );
  }
};

const Checkout = (props) => {
  console.log(props);

  const initialUserState = {
    id: null,
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  };
  const [shipping, setShipping] = useState(initialUserState);
  const [successful, setSuccessful] = useState(false);
  const form = useRef();
  const checkButton = useRef();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    const data = {
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      zipcode: shipping.zipcode,
      country: shipping.country,
    };
    console.log(data);
    if (checkButton.current.context._errors.length === 0) {
      dispatch(cartActions.saveShipping(data));
      props.history.push("/payment");
    }
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Form
        className="d-flex justify-content-center"
        onSubmit={handleSubmit}
        ref={form}
      >
        {!successful && (
          <div>
            <h1>Shipping</h1>
            <>
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                name="address"
                value={shipping.address}
                onChange={handleInputChange}
                validations={[required]}
              />
            </>
            <div>
              <label htmlFor="city">City</label>
              <Input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <Input
                type="text"
                name="state"
                value={shipping.state}
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div>
              <label htmlFor="zipcode">Zip Code</label>
              <Input
                type="text"
                name="zipcode"
                value={shipping.zipcode}
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <Input
                type="text"
                name="country"
                value={shipping.country}
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <CheckButton style={{ display: "none" }} ref={checkButton} />
            <button className="btn btn-info btn-block rounded-pill">
              Next Step
            </button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Checkout;
