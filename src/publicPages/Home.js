import React from "react";
import work from "../assets/work.mp4";
import VideoSecLeft from "../components/VideoSecLeft";
import VideoSecRight from "../components/VideoSecRight";
import cool from "../assets/cool.mp4";
import fun from "../assets/fun.mp4";
import jeans from "../assets/jeans.mp4";
import model from "../assets/model.mp4";

const Home = () => {
  return (
    <div className="home-page">
      <VideoSecRight video={model} style="Find Your Style" />
      <VideoSecLeft video={work} style="For Work" />
      <VideoSecRight video={fun} style="For Fun" />
      <VideoSecLeft video={cool} style="Being Cool" />
      <VideoSecRight video={jeans} style="Hanging Out" />
    </div>
  );
};

export default Home;
