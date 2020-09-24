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
      <div className="alert alert-dark" role="alert">
        This field is required!
      </div>
    );
  }
};

const Signin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const form = useRef();
  const checkButton = useRef();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
  }, [user]);

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
        .then((response) => {
          window.location.reload();
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  if (user && user.roles.includes("ADMIN")) {
    return <Redirect to="/admin" />;
  }
  if (user) {
    return <Redirect to="/cart" />;
  } else {
    return (
      <div className="page">
        <div className="d-flex justify-content-center">
          <Form className="form" onSubmit={handleSubmit} ref={form}>
            <h2 className="form-title">Sign In</h2>
            <div className="form-group">
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-dark btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>SIGN IN</span>
              </button>
            </div>

            {message && (
              <div>
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkButton} />
            <div className="d-flex justify-content-around">
              <p>New Member? Please Register Here:</p>
              <strong className="btn btn-light btn-sm">
                <Link
                  to={
                    redirect === "/"
                      ? "register"
                      : "register?redirect=" + redirect
                  }
                >
                  <button className="btn btn-outline-dark ">Register</button>
                </Link>
              </strong>
            </div>
          </Form>
        </div>
      </div>
    );
  }
};

export default Signin;
