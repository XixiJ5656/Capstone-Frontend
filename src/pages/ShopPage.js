import React, { useState, useEffect } from "react";

import ApiServices from "../Api/ApiServices";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ApiServices.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const defaultContent =
          (error.response && error.response.data) ||
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

export default Home;
