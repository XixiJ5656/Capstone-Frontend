import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import productActions from "../actions/productActions";
import { useDispatch } from "react-redux";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-info" role="alert">
        Required Information!
      </div>
    );
  }
};

const AddProduct = (props) => {
  const initialProductState = {
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
  const [sizeArr, setSizeArr] = useState([""]);
  const [colorArr, setColorArr] = useState([""]);
  const [imageArr, setImageArr] = useState([""]);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkButton = useRef();
  const dispatch = useDispatch();

  const handleAddSize = () => {
    const values = [...sizeArr];
    values.push("");
    setSizeArr(values);
  };
  const handleAddColor = () => {
    const values = [...colorArr];
    values.push("");
    setColorArr(values);
  };
  const handleAddImage = () => {
    const values = [...imageArr];
    values.push("");
    setImageArr(values);
  };

  const handleRemoveSize = (index) => {
    const values = [...sizeArr];
    values.splice(index, 1);
    setSizeArr(values);
  };
  const handleRemoveColor = (index) => {
    const values = [...colorArr];
    values.splice(index, 1);
    setColorArr(values);
  };
  const handleRemoveImage = (index) => {
    const values = [...imageArr];
    values.splice(index, 1);
    setImageArr(values);
  };

  const handleSizeInput = (index, event) => {
    const values = [...sizeArr];
    values[index] = event.target.value;
    setSizeArr(values);
  };
  const handleColorInput = (index, event) => {
    const values = [...colorArr];
    values[index] = event.target.value;
    setColorArr(values);
  };
  const handleImageInput = (index, event) => {
    const values = [...imageArr];
    values[index] = event.target.value;
    setImageArr(values);
  };

  const handleSizeSave = (event) => {
    event.preventDefault();
    setProduct({ ...product, size: sizeArr });
  };
  const handleColorSave = (event) => {
    event.preventDefault();
    setProduct({ ...product, color: colorArr });
  };
  const handleImageSave = (event) => {
    setProduct({ ...product, image: imageArr });

    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitted(false);
    form.current.validateAll();
    const data = {
      name: product.name,
      inventory: Number(product.inventory),
      type: product.type,
      price: Number(product.price),
      size: product.size,
      color: product.color,
      description: product.description,
      image: product.image,
    };
    console.log(data);

    if (checkButton.current.context._errors.length === 0) {
      dispatch(productActions.addProduct(data));
      props.history.push("/admin/product-management");
    }
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2 className="form-title">ADD NEW PRODUCT</h2>
        <button
          className="btn btn-outline-dark mb-5"
          onClick={() => props.history.push("/admin")}
        >
          Back To DashBoard
        </button>
      </div>

      <Form onSubmit={handleSubmit} ref={form}>
        {!submitted ? (
          <div>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                name="name"
                value={product.name}
                placeholder="Product Name"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="number"
                name="inventory"
                value={product.inventory}
                placeholder="Inventory"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                name="type"
                value={product.type}
                placeholder="Type"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="number"
                name="price"
                value={product.price}
                placeholder="Price"
                onChange={handleInputChange}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              {sizeArr.map((size, index) => (
                <div className="d-flex" key={index}>
                  <div className="form-group">
                    <Input
                      className="form-control"
                      type="text"
                      name="size"
                      value={size}
                      placeholder="Size"
                      validations={[required]}
                      onChange={(event) => handleSizeInput(index, event)}
                    />
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-link btn-lg"
                      disabled={index === 0}
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link btn-lg"
                      type="button"
                      onClick={() => handleAddSize()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                disabled={!sizeArr[0]}
                onClick={handleSizeSave}
                className="btn btn-secondary"
              >
                Save
              </button>
            </div>

            <div className="form-group">
              {colorArr.map((color, index) => (
                <div className="d-flex" key={index}>
                  <div className="form-group">
                    <Input
                      className="form-control"
                      type="text"
                      name="color"
                      value={color}
                      placeholder="Color"
                      validations={[required]}
                      onChange={(event) => handleColorInput(index, event)}
                    />
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-link btn-lg"
                      disabled={index === 0}
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link btn-lg"
                      type="button"
                      onClick={() => handleAddColor()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                disabled={!colorArr[0]}
                onClick={handleColorSave}
                className="btn btn-secondary"
              >
                Save
              </button>
            </div>
            <div className="form-group">
              {imageArr.map((image, index) => (
                <div className="d-flex" key={index}>
                  <div className="form-group">
                    <Input
                      className="form-control"
                      type="text"
                      name="image"
                      value={image}
                      placeholder="Iamge"
                      validations={[required]}
                      onChange={(event) => handleImageInput(index, event)}
                    />
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-link btn-lg"
                      disabled={index === 0}
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link btn-lg"
                      type="button"
                      onClick={() => handleAddImage()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                disabled={!imageArr[0]}
                onClick={handleImageSave}
                className="btn btn-secondary"
              >
                Save
              </button>
            </div>

            <textarea
              className="form-control mb-5"
              type="textarea"
              name="description"
              value={product.description}
              placeholder="Description"
              onChange={handleInputChange}
            />

            <button
              className="btn btn-dark btn-block"
              disabled={
                !product.size[0] || !product.color[0] || !product.image[0]
              }
            >
              Submit
            </button>
          </div>
        ) : (
          message && <div>{message}</div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkButton} />
      </Form>
    </div>
  );
};

export default AddProduct;
