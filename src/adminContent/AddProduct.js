import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import productActions from "../actions/productActions";
import { useDispatch } from "react-redux";
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
                validations={[required]}
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
                validations={[required]}
              />
            </li>
            <li>
              {sizeArr.map((size, index) => (
                <div key={index}>
                  <div>
                    <label htmlFor="size">size</label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={size}
                      onChange={(event) => handleSizeInput(index, event)}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                    >
                      -
                    </button>
                    <button type="button" onClick={() => handleAddSize()}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={handleSizeSave}>Save</button>
            </li>
            <li>
              {colorArr.map((color, index) => (
                <div key={index}>
                  <div className="form-group col-sm-6">
                    <label htmlFor="color">color</label>
                    <input
                      type="text"
                      className="form-control"
                      name="color"
                      value={color}
                      onChange={(event) => handleColorInput(index, event)}
                    />
                  </div>
                  <div className="form-group col-sm-2">
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleAddColor()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleColorSave}
                className="btn btn-primary mr-2"
              >
                Save
              </button>
            </li>
            <li>
              {imageArr.map((image, index) => (
                <div key={index}>
                  <div className="form-group col-sm-6">
                    <label htmlFor="image">image</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={image}
                      onChange={(event) => handleImageInput(index, event)}
                    />
                  </div>
                  <div className="form-group col-sm-2">
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleAddImage()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleImageSave}
                className="btn btn-primary mr-2"
              >
                Save
              </button>
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
              <button className="btn btn-info rounded-pill">Submit</button>
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
