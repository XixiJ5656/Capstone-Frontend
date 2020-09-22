import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import authServices from "../services/authServices";
import { useDispatch } from "react-redux";
import authActions from "../actions/authActions";
import "../App.css";

const Navigation = () => {
  const [navBackground, setNavBackground] = useState(false);
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
    <div className="navigation">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to={"/home"}>
              <i class="fas fa-home"></i>XYZ
            </Link>
          </li>
          <li>
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>

          {adminBoard && (
            <li>
              <NavLink to={"/admin"}>Admin</NavLink>
            </li>
          )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/user/userinfo"} className="nav-link">
                  {currentUser.username.toUpperCase()}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home" className="nav-link" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/signin"} className="nav-link">
                  Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
