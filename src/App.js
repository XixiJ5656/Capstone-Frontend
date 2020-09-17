import React from "react";
import Navigation from "./navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import UserInfo from "./UserMode/UserInfo";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const { isSignedIn } = auth;

  return (
    <Router>
      <div>
        <Navigation />
        <div>
          <Switch>
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart/:id?" component={ShoppingCart} />
            <Route exact path="/shop" component={Shop} />
            {!isSignedIn ? (
              <Route exact path="/signin" component={Signin} />
            ) : (
              <Route exact path="/user/userinfo" component={UserInfo} />
              // <Route exact path="/user/*" component={UserDashBoard} />
            )}
            <Route exact path="/register" component={Register} />
            <Route exact path={["/", "/home"]} component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
