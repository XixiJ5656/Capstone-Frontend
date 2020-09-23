import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";
import { Link } from "react-router-dom";

import authActions from "../actions/authActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-dark" role="alert">
        This field is required!
      </div>
    );
  }
};

const validateEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-dark" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validateUername = (value) => {
  if (value.length < 3 || value.length > 15) {
    return (
      <div className="alert alert-dark" role="alert">
        The username must be between 3 and 15 characters.
      </div>
    );
  }
};

const validatePassword = (value) => {
  if (value.length < 7 || value.length > 30) {
    return (
      <div className="alert alert-dark" role="alert">
        The password must be between 7 and 30 characters.
      </div>
    );
  }
};

const Register = (props) => {
  console.log(props);

  const initialUserState = {
    id: null,
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const form = useRef();
  const checkButton = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    console.log(data);
    if (checkButton.current.context._errors.length === 0) {
      dispatch(authActions.register(data))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="page">
      <div className="d-flex justify-content-center">
        <Form className="form" onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <h2 className="form-title">Register Form</h2>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  placeholder="Username"
                  onChange={handleInputChange}
                  validations={[required, validateUername]}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  validations={[required, validateEmail]}
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                  validations={[required, validatePassword]}
                />
              </div>
              <div>
                <button className="btn btn-dark btn-block ">REGISTER</button>
              </div>
            </div>
          )}

          {message && (
            <div>
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkButton} />
          <div className="signin-after-register">
            <div>Already have an account,please sign in here:</div>
            <Link to="/signin">
              <button className="btn btn-outline-dark">Sign In</button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
