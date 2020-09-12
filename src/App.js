import React from "react";
import Navbar from "./components/navcomponents/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Userinfo from "./pages/Userinfo";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Userinfo} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
