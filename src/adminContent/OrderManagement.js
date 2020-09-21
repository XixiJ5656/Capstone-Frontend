import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import orderActions from "../actions/orderActions";

const OrderManagement = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const { orders, loading, error } = useSelector((state) => state.orderManage);
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(() => {
    dispatch(orderActions.fetchOrders());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(orderActions.deleteOrderById(id));
  };

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="table-responsive-md mx-3">
      <h1 className="d-flex justify-content-center my-4">Order Management</h1>
      <div className="d-flex justify-content-between my-4">
        <button onClick={() => props.history.push("/admin")}>
          Back To DashBoard
        </button>
        <button className="btn btn-info"> Export File</button>
      </div>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Order Number</th>
            <th>Username</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>zip code</th>
            <th>Country</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="product-row" key={order.id}>
              <td>{order.id}</td>
              <td>{order.username}</td>
              <td>{order.address}</td>
              <td>{order.city}</td>
              <td> {order.state}</td>
              <td>{order.zipcode}</td>
              <td>{order.country}</td>

              <td>
                <button
                  // onClick={() => handleEdit(order.id)}
                  className="btn btn-outline-info btn-sm"
                >
                  Deliver
                </button>
              </td>

              <td>
                <button
                  onClick={() => handleEdit(order.id)}
                  className="btn btn-outline-info btn-sm"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination
        productNum={products.length}
        pageSize={3}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      /> */}
    </div>
  );
};

export default OrderManagement;
