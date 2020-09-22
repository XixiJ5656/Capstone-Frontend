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
            <Link to={"/user/userinfo"} className="nav-link">
              {currentUser.username.toUpperCase()}
            </Link>
            <Link to="/home" className="nav-link" onClick={signOut}>
              Sign Out
            </Link>
          </div>
        ) : (
          <div>
            <img src={search} height="25vmin" alt="search" />
            <Link to={"/cart"}>
              <img src={cart} height="25vmin" alt="cart" />
            </Link>

            <Link to={"/signin"}>
              <img src={user} height="25vmin" alt="sign in" />
            </Link>
          </div>
        )}
        {adminBoard && <NavLink to={"/admin"}>Admin</NavLink>}
      </section>
      <section className="nav-second">
        <div>
          <Link to={"/home"}>Home</Link>
        </div>
        <div>
          <Link to={"/shop"}>Shop</Link>
        </div>
      </section>
    </nav>
  );
};

export default Navigation;
