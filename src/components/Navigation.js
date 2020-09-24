import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import authServices from "../services/authServices";
import { useDispatch } from "react-redux";
import authActions from "../actions/authActions";
import "../App.css";
import diam from "../assets/diam.svg";
import adminhub from "../assets/adminhub.svg";
import user from "../assets/user.svg";
import signout from "../assets/signout.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";
const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = authServices.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setAdmin(user.roles.includes("ADMIN"));
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
            <img src={diam} height="50vmin" alt="logo" />
          </Link>
        </div>

        {currentUser ? (
          <div className="nav-first">
            <Link to={"/user/profile"} className="nav-link">
              <p>{currentUser.username}</p>
            </Link>
            {admin && (
              <NavLink className="nav-link" to={"/admin"}>
                <img src={adminhub} height="25vmin" alt="" />
              </NavLink>
            )}
            <Link to={"/cart"} className="nav-link">
              <img src={cart} height="25vmin" alt="" />
            </Link>
            <Link to="/home" className="nav-link" onClick={signOut}>
              <img src={signout} height="23vmin" alt="" />
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
            </Link>
          </div>
        )}
      </section>
      <section className="nav-second">
        <div>
          <Link to={"/home"}>
            <h5>HOME</h5>
          </Link>
        </div>
        <div>
          <Link to={"/shop"}>
            <h5>SHOP</h5>
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default Navigation;
