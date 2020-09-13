import React from "react";
import { NavLink } from "react-router-dom";
const BeforeAuth = () => {
  return (
    <div className="navbar-nav ml-auto">
      <NavLink to={"/signin"} className="nav-link">
        SIGN IN
      </NavLink>
      <NavLink to={"/register"} className="nav-link">
        REGISTER
      </NavLink>
    </div>
  );
};

export default BeforeAuth;
