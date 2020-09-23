import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
const creditCard = () => {
  const initialCardState = {
    number: "",
    name: "",
    expiration: "",
    cvc: "",
    focus: "",
  };
  const [card, setCard] = useState(initiaCardState);
  return <div></div>;
};

export default creditCard;
