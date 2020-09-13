import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Authentication from "../AuthServices/Authentication";
import BeforeAuth from "../AuthServices/BeforeAuth";

const Navigation = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [moderatorBoard, setModeratorBoard] = useState(false);
  const [adminBoard, setAdminBoard] = useState(false);

  useEffect(() => {
    const user = Authentication.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
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
      <Link to={"/"} className="navbar-brand">
        Warmyi
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
        {currentUser && (
          <Link to={"/user"} className="nav-link">
            User
          </Link>
        )}

        {moderatorBoard && (
          <NavLink to={"/moderator"} className="nav-link">
            Moderator DashBoard
          </NavLink>
        )}

        {adminBoard && (
          <NavLink to={"/admin"} className="nav-link">
            Admin DashBoard
          </NavLink>
        )}
      </div>

      {!currentUser ? (
        <BeforeAuth />
      ) : (
        <div className="navbar-nav ml-auto">
          <NavLink to={"/profile"} className="nav-link">
            {currentUser.username}
          </NavLink>
          <a href="/signin" className="nav-link" onClick={signOut}>
            SIGN OUT
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
