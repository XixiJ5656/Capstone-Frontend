import React from "react";
import "./Home.css";
import black from "../assets/black.mp4";
import color from "../assets/color.mp4";
import beige from "../assets/beige.mp4";
import background from "../assets/background.mp4";

const Home = () => {
  return (
    <div className="home-page">
      <div className="background-home">
        <video autoPlay loop>
          <source src={background} type="video/mp4" />
        </video>
      </div>
      <div className="white-tone">
        <video autoPlay loop>
          <source src={black} type="video/mp4" />
        </video>
      </div>
      <div className="beige-tone">
        <video autoPlay loop>
          <source src={beige} type="video/mp4" />
        </video>
      </div>
      <div className="black-tone">
        <video autoPlay loop>
          <source src={color} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Home;
