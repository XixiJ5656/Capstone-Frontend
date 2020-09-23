import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const AdminBoard = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.roles.includes("ADMIN")) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="form">
        <h1>ADMIN DASHBOARD</h1>
        <br />

        <button onClick={() => props.history.push("/admin/product-management")}>
          Product Mangement
        </button>
        <button onClick={() => props.history.push("/admin/order-management")}>
          Order Management
        </button>
      </div>
    );
  }
};

export default AdminBoard;
