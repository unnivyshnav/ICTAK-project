import Course from "../course/Course";
import "./courses.css";

function Courses({ courses }) {
  return (
    <>
      <div className="courses">
        {courses.map((c, key) => (
          <Course key={key} course={c} />
        ))}
      </div>
    </>
  );
}

export default Courses;
