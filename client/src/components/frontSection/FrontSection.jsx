import React, { useEffect } from "react";
import { Button } from "../button/Button";
import "./FrontSection.css";
import Aos from "aos";
import "aos/dist/aos.css";

function FrontSection() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="container-fluid main">
      <div className="col-sm front-top container">
        <div className="row head mt-5">
          <div className="col">
            <h1 className="header" data-aos="fade-right">
              ICT ACADEMY
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <p className="desc " data-aos="zoom-out-down">
              Industry focused ICT skills development programmes for students{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <Button className="btn btn-large" onClick="/Courses">
              Go through our courses{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontSection;
