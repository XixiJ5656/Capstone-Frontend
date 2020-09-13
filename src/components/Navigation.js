import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Authentication from "../AuthServices/Authentication";
import BeforeAuth from "../AuthServices/BeforeAuth";

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
        backgroundColor: navBackground ? "black" : "transparent",
        transition: "100ms ease",
      }}
    >
      <Link to={"/"}>Warmyi</Link>
      <div>
        <NavLink to={"/home"} c>
          HOME
        </NavLink>
        <NavLink to={"/shop"}>SHOP</NavLink>

        {currentUser && <NavLink to={"/user"}>USER VIEW</NavLink>}

        {adminBoard && <NavLink to={"/admin"}>Admin DashBoard</NavLink>}
      </div>
      <NavLink to={"/cart"}>CART</NavLink>
      {!currentUser ? (
        <BeforeAuth />
      ) : (
        <div className="navbar-nav ml-auto">
          <NavLink to={"/userinfo"}>{currentUser.username}</NavLink>
          <a href="/signin" className="nav-link" onClick={signOut}>
            SIGN OUT
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
