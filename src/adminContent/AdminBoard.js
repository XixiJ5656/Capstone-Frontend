import React from "react";

const AdminBoard = (props) => {
  return (
    <div className="container">
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
};

export default AdminBoard;
