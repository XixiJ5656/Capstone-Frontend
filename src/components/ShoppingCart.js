import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../actions/cartActions";
import { Link } from "react-router-dom";
import remove from "../assets/remove.svg";

const ShoppingCart = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const itemInfoArray = props.location.search.split("=");
  const { isSignedIn } = useSelector((state) => state.auth);
  const size =
    itemInfoArray[1] === "" ? "Please Choose Your Size" : itemInfoArray[1];
  const color =
    itemInfoArray[3] === "" ? "Please Choose Your Color" : itemInfoArray[3];
  const qty = itemInfoArray[5] === "undefined" ? 1 : Number(itemInfoArray[5]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(cartActions.addToCart(id, qty, size, color));
    }
  }, [dispatch]);

  const removeItem = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <section className="container mt-5">
      <div className="d-flex justify-content-end mb-5">
        <button
          onClick={() => props.history.push("/shop")}
          className="btn btn-dark btn-sm"
        >
          Continue Shopping
        </button>
      </div>
      <h3 className="shopping-cart">SHOPPING CART</h3>
      {cartItems.length === 0 ? (
        <h5 className="text-center">Cart is empty</h5>
      ) : (
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Color</th>
              <th scope="col">Size</th>
              <th scope="col">Quantity</th>
              <th scope="col">Totoal/Item</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr className="product-row" key={item.id}>
                <td>
                  <Link to={"/product/" + item.id}>
                    <img src={item.image} alt="" width="100px" />
                  </Link>
                </td>
                <td>
                  <Link to={"/product/" + item.id}>
                    <p className="cart-item-name">{item.name}</p>
                  </Link>
                </td>

                <td>${item.price}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>
                  Qty:
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(cartActions.addToCart(item.id, e.target.value))
                    }
                  >
                    {[...Array(item.inventory).keys()].map((index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </td>

                <td>${(item.price * item.qty).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <img src={remove} height="20vmin" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex align-items-end flex-column mt-5">
        <h4 className="subtotal">
          Subtotal (
          {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} Items)
          : ${" "}
          {cartItems.reduce(
            (a, c) => (parseFloat(a) + parseFloat(c.price * c.qty)).toFixed(2),
            0
          )}
        </h4>

        <button
          onClick={() =>
            props.history.push(isSignedIn ? "/shipping" : "/signin")
          }
          className="btn btn-dark "
          disabled={cartItems.length === 0}
        >
          Check Out
        </button>
      </div>
    </section>
  );
};

export default ShoppingCart;
