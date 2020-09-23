import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import authServices from "../services/authServices";
import { useDispatch } from "react-redux";
import authActions from "../actions/authActions";
import "../App.css";
import logo from "../logo.svg";
import user from "../assets/user.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";
const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [adminBoard, setAdminBoard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = authServices.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const signOut = () => {
    dispatch(authActions.signout());
    window.location.reload();
  };
  return (
    <nav className="navigation">
      <section className="nav-first">
        <div>
          <Link to={"/home"}>
            {" "}
            <img src={logo} height="40vmin" alt="logo" />
          </Link>
        </div>

        {currentUser ? (
          <div className="nav-first">
            <Link to={"/user/profile"} className="nav-link">
              {currentUser.username.toUpperCase()}
            </Link>
            <Link to={"/cart"} className="nav-link">
              <img src={cart} height="25vmin" alt="" />
            </Link>
            <Link to="/home" className="nav-link" onClick={signOut}>
              <img src={user} height="25vmin" alt="" />
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="nav-first">
            <img
              className="nav-link"
              src={search}
              height="40vmin"
              alt="search"
            />
            <Link to={"/cart"} className="nav-link">
              <img src={cart} height="25vmin" alt="cart" />
            </Link>

            <Link to={"/signin"} className="nav-link">
              <img src={user} height="25vmin" alt="" />
              Sign In
            </Link>
          </div>
        )}
        {adminBoard && <NavLink to={"/admin"}>Admin</NavLink>}
      </section>
      <section className="nav-second">
        <div>
          <Link to={"/home"}>
            <h5>Home</h5>
          </Link>
        </div>
        <div>
          <Link to={"/shop"}>
            <h5>Shop</h5>
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default Navigation;
