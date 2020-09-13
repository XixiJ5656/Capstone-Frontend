import React, { useState, useEffect } from "react";

import ApiServices from "../Api/ApiServices";
const UserBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ApiServices.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const defaultContent =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(defaultContent);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default UserBoard;
