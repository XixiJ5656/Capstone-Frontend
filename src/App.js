import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import UserInfo from "./UserMode/UserInfo";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/userinfo" component={UserInfo} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
