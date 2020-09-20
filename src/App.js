import React from "react";
import Navigation from "./navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./publicPages/Home";
import Shop from "./publicPages/Shop";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Signin from "./forms/Signin";
import Register from "./forms/Register";
import UserInfo from "./userContent/UserInfo";
import { useSelector } from "react-redux";
import Payment from "./userContent/Payment";
import PlaceOrder from "./userContent/PlaceOrder";

import ProductManagement from "./adminContent/ProductManagement";
import AdminBoard from "./adminContent/AdminBoard";
import OrderManagement from "./adminContent/OrderManagement";
import AddProduct from "./adminContent/AddProduct";
import UpdateProduct from "./adminContent/UpdateProduct";

import Checkout from "./userContent/Checkout";
const App = () => {
  const auth = useSelector((state) => state.auth);
  const { isSignedIn } = auth;

  return (
    <Router>
      <div>
        <Navigation />
        <div>
          <Switch>
            <Route
              path="/admin/product-management"
              component={ProductManagement}
            />
            <Route path="/admin/order-management" component={OrderManagement} />
            <Route path="/admin/add-product" component={AddProduct} />
            <Route path="/admin/update-product" component={UpdateProduct} />
            <Route path="/admin" component={AdminBoard} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/shipping" component={Checkout} />
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
