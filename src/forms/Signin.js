import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import authActions from "../actions/authActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Signin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isSignedIn } = auth;
  const { message } = useSelector((state) => state.message);
  console.log(message);
  const dispatch = useDispatch();
  const form = useRef();
  console.log(form);
  const checkButton = useRef();
  console.log(checkButton);

  useEffect(() => {
    if (isSignedIn) {
      props.history.push("/home");
    }
  });

  const handleUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkButton.current.context._errors.length === 0) {
      dispatch(authActions.signin(username, password))
        .then(() => {
          props.history.push("/user");
          window.location.reload();
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };
  if (isSignedIn) {
    return <Redirect to="/user/userInfo" />;
  }
  return (
    <div className="signin-page">
      <h2> Sign In</h2>
      <Form onSubmit={handleSubmit} ref={form}>
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={handleUsername}
              validations={[required]}
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
              validations={[required]}
            />
          </li>
          <li>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>SIGN IN</span>
            </button>
          </li>
        </ul>
        {message && (
          <div>
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkButton} />
        <div>
          <p>NEW MEMBER PLEASE REGISTER HERE</p>
          <strong className="btn btn-warning">
            <Link to={"/register"}>REGISTER</Link>
          </strong>
        </div>
      </Form>
    </div>
  );
};

export default Signin;
