import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../actions/cartActions";
import { Link } from "react-router-dom";

const ShoppingCart = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const qty = (props.location.search.split("=")[1] = "undefined"
    ? 1
    : Number(props.location.search.split("=")[1]));
  console.log(props.location.search.split("="));
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(cartActions.addToCart(id, qty));
    }
  }, [dispatch]);
  const removeItem = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleCheckout = () => {
    props.history.push("/user/checkout");
  };

  return (
    <section className="cart">
      <div className="cart-list">
        <div className="cart-list-container">
          <h4>Shopping Cart</h4>

          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div>
                <Link to={"/product/" + item.productId}>
                  <img src={item.image} alt="" width="100px" />
                </Link>
                <p>{item.name}</p>
                <p>
                  <strong>Qty:</strong>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(cartActions.addToCart(item.id, e.target.value))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </p>
                <p>${item.price}</p>
                <button onClick={() => removeItem(item.id)}>remove</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-action">
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => parseInt(a + c.qty), 0)}{" "}
            items) : $ {(cartItems.reduce((a, c) => a + c.price * c.qty), 0)}
          </h3>
          <Link to="/shop">Continue To Shop</Link>
          <button
            onClick={handleCheckout}
            className="button primary full-width"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
