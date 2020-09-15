import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import UserInfo from "./UserMode/UserInfo";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <div>
          <Switch>
            <Route path="/product/:id" component={ProductDetails} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/userinfo" component={UserInfo} />
            <Route exact path={["/", "/home"]} component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
