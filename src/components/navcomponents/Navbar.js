import React, { Component } from "react";
import { Link } from "react-router-dom";
import Authentication from "../../bfconnections/Authentication";

class Navbar extends Component {
  state = {
    currentUser: false,
    moderatorBoard: false,
    adminBoard: false,
  };

  //   const [navBackground, setNavBackground] = useState(false);
  //   const [currentUser, setCurrentUser] = useState(false);
  //   const [moderatorBoard, setModeratorBoard] = useState(false);
  //   const [adminBoard, setAdminBoard] = useState(false);

  //   useEffect(() => {
  //     const user = Authentication.getCurrentUser();
  //     if (user) {
  //       setCurrentUser(user);
  //       setModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
  //       setAdminBoard(user.roles.includes("ROLE_ADMIN"));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       if (window.scrollY > 200) {
  //         setNavBackground(true);
  //       } else setNavBackground(false);
  //     });
  //     return () => {
  //       window.removeEventListener("scroll", null);
  //     };
  //   });

  componentDidMount() {
    const user = Authentication.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        moderatorBoard: user.roles.includes("ROLE_MODERATOR"),
        adminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  SignOut = () => {
    Authentication.signout();
  };

  render() {
    const { currentUser, moderatorBoard, adminBoard } = this.state;
    return (
      <nav
      // className="navbar"
      // style={{
      //   backgroundColor: navBackground ? "black" : "transparent",
      //   transition: "100ms ease",
      // }}
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
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}

          {moderatorBoard && (
            <li className="nav-item">
              <Link to={"/moderator"} className="nav-link">
                Moderator DashBoard
              </Link>
            </li>
          )}

          {adminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin DashBoard
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/signin" className="nav-link" onClick={this.SignOut}>
                SIGN OUT
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/signin"} className="nav-link">
                SIGN IN
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                REGISTER
              </Link>
            </li>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
