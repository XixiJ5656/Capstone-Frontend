import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
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
  console.log(props);
  const initialProductState = {
    id: null,
    name: "",
    inventory: 0,
    type: "",
    price: 0,
    size: [],
    color: [],
    description: "",
    image: [],
  };

  // const [name, setName] = useState("");
  // const [inventory, setInventory] = useState(0);
  // const [type, setType] = useState("");
  // const [price, setPrice] = useState(0);
  // // const [sizeElement, setSizeElement] = useState("");
  // const [size, setSize] = useState([]);
  // const [color, setColor] = useState([]);
  // const [description, setDescription] = useState("");
  // const [image, setImage] = useState([]);
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);
  // const { message } = useSelector((state) => state.message);
  // const dispatch = useDispatch();
  const form = useRef();
  const checkButton = useRef();

  // const handleName = (e) => {
  //   const name = e.target.value;
  //   setName(name);
  // };

  // const handleInventory = (e) => {
  //   const inventory = e.target.value;
  //   setInventory(inventory);
  // };

  // const handleType = (e) => {
  //   const type = e.target.value;
  //   setType(type);
  // };

  // const handlePrice = (e) => {
  //   const price = e.target.value;
  //   setPrice(price);
  // };

  // const handleSize = (e) => {
  //   const size = e.target.value;

  //   console.log(size);
  //   setSize(size);
  // };

  // const handleColor = (e) => {
  //   const color = e.target.value;
  //   setColor(color);
  // };

  // const handleDescription = (e) => {
  //   const description = e.target.value;
  //   setDescription(description);
  // };

  // const handleImage = (e) => {
  //   const image = e.target.value;
  //   setImage(image);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
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
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      productServices
        .addProduct(data)
        .then((res) => {
          setProduct({
            id: res.data.id,
            name: res.data.name,
            inventory: res.data.inventory,
            type: res.data.type,
            price: res.data.price,
            size: res.data.size,
            color: res.data.color,
            description: res.data.description,
            image: res.data.description,
          });
          setSubmitted(true);
          console.log(res.data);
        })
        .catch((error) => console.log(error));

      // dispatch(productActions.addProduct(data))
      //   .then(() => {
      //     setSuccessful(true);
      //   })
      //   .catch(() => {
      //     setSuccessful(false);
      //   });
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
              <label htmlFor="size">Size</label>
              <Input
                type="text"
                name="size"
                value={product.size}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="color">Color</label>
              <Input
                type="text"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <Input
                type="text"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                validations={[required]}
              />
            </li>
            <li>
              <label htmlFor="type">Description</label>
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
          <div>
            <h4>Product is add successfully!</h4>
            <button>Back To Product Management</button>
            <button>Add More Products</button>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkButton} />
      </Form>
    </div>
  );
};

export default AddProduct;
