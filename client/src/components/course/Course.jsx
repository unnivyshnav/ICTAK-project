import "./course.css";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Course({ course }) {
  const PF = "https://ictak-project.herokuapp.com/images/";
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div data-aos="zoom-in-up" className="course">
      <Link className="link" to={`/course/${course._id}`}>
        <div className="courseInfo">
          <img className="courseImg" src={PF + course.photo} alt="" />
          <span className="courseTitle">{course.name}</span>
        </div>
      </Link>
      {/* <p className="courseDesc">{course.description}</p> */}
    </div>
  );
}

export default Course;
