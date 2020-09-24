import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch } from "react-redux";
import cartActions from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import next from "../assets/next.svg";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-dark" role="alert">
        This field is required!
      </div>
    );
  }
};

const Shipping = (props) => {
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
      <CheckoutSteps step1></CheckoutSteps>
      <Form className="card-body" onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <h2 className="form-title mb-5">Shipping</h2>
            <div className="form-group">
              <Input
                type="text"
                name="address"
                className="form-control"
                value={shipping.address}
                placeholder="Address"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <Input
                type="text"
                name="city"
                className="form-control"
                value={shipping.city}
                placeholder="City"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="state"
                className="form-control"
                value={shipping.state}
                placeholder="State"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="zipcode"
                className="form-control"
                value={shipping.zipcode}
                placeholder="Zip Code"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="country"
                className="form-control"
                value={shipping.country}
                placeholder="Country"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <CheckButton style={{ display: "none" }} ref={checkButton} />
            <div className="d-flex align-items-center flex-column mt-5">
              <button className="btn btn-outline-secondary">
                Next Step <img src={next} height="20vmin" alt="" />
              </button>
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your address with anyone else.
              </small>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Shipping;
