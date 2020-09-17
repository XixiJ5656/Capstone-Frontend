import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Authentication from "../services/AuthServices/Authentication";
import BeforeAuth from "./BeforeAuth";
import "../App.css";

const Navigation = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [adminBoard, setAdminBoard] = useState(false);

  useEffect(() => {
    const user = Authentication.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setNavBackground(true);
      } else setNavBackground(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  });

  const signOut = () => {
    Authentication.signout();
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: navBackground ? "white" : "transparent",
        transition: "100ms ease",
      }}
    >
      <Link to={"/"}>WY</Link>
      <ul className="navigation">
        <li>
          <NavLink to={"/home"}>HOME</NavLink>
        </li>
        <li>
          <NavLink to={"/shop"}>SHOP</NavLink>
        </li>
        <li>
          <NavLink to={"/cart"}>CART</NavLink>
        </li>
      </ul>

      {!currentUser ? (
        <BeforeAuth />
      ) : (
        <div className="auth-navigation">
          {currentUser && <NavLink to={"/user/cart"}>MY CART</NavLink>}
          {adminBoard && <NavLink to={"/admin"}>Admin DashBoard</NavLink>}
          <NavLink to={"/user/userinfo"}>{currentUser.username}</NavLink>
          <a href="/home" className="nav-link" onClick={signOut}>
            SIGN OUT
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
