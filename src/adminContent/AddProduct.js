import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import productServices from "../services/productServices";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-warning" role="alert">
        Required Information!
      </div>
    );
  }
};

const AddProduct = (props) => {
  const initialProductState = {
    id: null,
    name: "",
    inventory: 0,
    type: "",
    price: 0.0,
    size: [],
    color: [],
    description: "",
    image: [],
  };

  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkButton = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const resetProduct = () => {
    setProduct(() => initialProductState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitted(false);
    form.current.validateAll();
    const data = {
      name: product.name,
      inventory: product.inventory,
      type: product.type,
      price: product.price,
      size: product.size,
      color: product.color,
      description: product.description,
      image: product.image,
    };
    console.log(data);

    if (checkButton.current.context._errors.length === 0) {
      productServices.addProduct(data).then(
        (response) => {
          setMessage(response.data.message);
          setSubmitted(true);
        },
        (error) => {
          console.log(error);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSubmitted(false);
        }
      );
    }
  };
  return (
    <div>
      <h1>ADD NEW PRODUCT</h1>
      <Form className="product-from" onSubmit={handleSubmit} ref={form}>
        {!submitted ? (
          <ul>
            <li>
              <label htmlFor="name">Product Name</label>
              <Input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="inventory">Inventory</label>
              <Input
                type="number"
                name="inventory"
                value={product.inventory}
                onChange={handleInputChange}
                // validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="type">Type</label>
              <Input
                type="text"
                name="type"
                value={product.type}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                // validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="size">Size</label>
              <Input
                type="text"
                name="size"
                value={product.size}
                onChange={handleInputChange}
                // validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="color">Color</label>
              <Input
                type="text"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                // validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <Input
                type="text"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                // validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="Description">Description</label>
              <br />
              <textarea
                type="textarea"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <button className="btn btn-info btn-block rounded-pill">
                Submit
              </button>
            </li>
          </ul>
        ) : (
          message && <div>{message}</div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkButton} />
      </Form>
    </div>
  );
};

export default AddProduct;
