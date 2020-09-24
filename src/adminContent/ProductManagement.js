import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import productActions from "../actions/productActions";
import del from "../assets/del.svg";
import edit from "../assets/edit.svg";
import Pagination from "../components/Pagination";
// import paginate from "../utils/paginate";

const ProductManagement = (props) => {
  const { products } = useSelector((state) => state.productManage);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log(id);
    dispatch(productActions.deleteProductById(id));
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(productActions.deleteProductById(id));
  };

  // const handlePageChange = (pageNum) => {
  //   setCurrentPage(pageNum);
  // };
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  if (!user || !user.roles.includes("ADMIN")) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="table-responsive-md mx-3">
        <h1 className="d-flex justify-content-center my-4">
          Product Management
        </h1>
        <div className="d-flex justify-content-between my-4">
          <button
            className="btn btn-outline-dark"
            onClick={() => props.history.push("/admin")}
          >
            Back To DashBoard
          </button>
          <button
            onClick={() => {
              props.history.push("/admin/add-product");
            }}
            className="btn btn-outline-dark"
          >
            Add Product
          </button>
        </div>

        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Color</th>
              <th>Size</th>
              <th>Description</th>
              <th>Inventory</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="product-row" key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image[0]} alt="" width="50px" />
                </td>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.price}</td>
                <td>
                  {product.color.map((color) => (
                    <strong>*{color}</strong>
                  ))}
                </td>
                <td>
                  {product.size.map((size) => (
                    <strong>*{size}</strong>
                  ))}
                </td>
                <td>{product.description}</td>
                <td>{product.inventory}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-light btn-sm"
                  >
                    <img src={edit} height="25vmin" alt="" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-light btn-sm"
                  >
                    <img src={del} height="25vmin" alt="" />
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
  }
};

export default ProductManagement;
