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
      <div className="alert alert-warning" role="alert">
        This field is required!
      </div>
    );
  }
};

const validateEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-warning" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validateUername = (value) => {
  if (value.length < 3 || value.length > 15) {
    return (
      <div className="alert alert-warning" role="alert">
        The username must be between 3 and 15 characters.
      </div>
    );
  }
};

const validatePassword = (value) => {
  if (value.length < 7 || value.length > 30) {
    return (
      <div className="alert alert-warning" role="alert">
        The password must be between 7 and 30 characters.
      </div>
    );
  }
};

const Register = (props) => {
  console.log();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const form = useRef();
  const checkButton = useRef();

  const handleUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      dispatch(authActions.register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  return (
    <div className="register-page">
      <Form className="register-from" onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <ul>
            <li>Register Form</li>
            <li>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleUsername}
                validations={[required, validateUername]}
              />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={handleEmail}
                validations={[required, validateEmail]}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handlePassword}
                validations={[required, validatePassword]}
              />
            </li>
            <li>
              <button className="btn btn-info btn-block rounded-pill">
                REGISTER
              </button>
            </li>
          </ul>
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
        <div>ALREADY HAVE AN ACCOUNT, PLEASE SIGN IN HERE</div>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </Form>
    </div>
  );
};

export default Register;
