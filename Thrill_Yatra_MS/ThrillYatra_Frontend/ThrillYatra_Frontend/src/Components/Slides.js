import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Slides.css";
import bgImage from "../images/ThrillYatra.png";

function Slides() {
  return (
    <div className="slides-wrapper">
      <ToastContainer />

      <img
        src={bgImage}
        alt="Homepage Background"
        className="slides-bg"
      />
    </div>
  );
}

export default Slides;
