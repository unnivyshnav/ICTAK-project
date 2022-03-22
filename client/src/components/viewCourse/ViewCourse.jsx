import "./viewCourse.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";

export default function ViewCourse() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [course, setCourse] = useState({});
  const PF = "https://ictak-project.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/course/find/" + path
        // {
        //   headers: { token: "Bearer " + user.accessToken },
        // }
      );
      setCourse(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
    };
    getCourse();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://ictak-project.herokuapp.com/api/course/${course._id}`,

        {
          headers: { token: "Bearer " + user.accessToken },
        },
        { username: user.username }
      );
      window.location.replace("/courses");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://ictak-project.herokuapp.com/api/course/${course._id}`,
        {
          name,
          description,
        },
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singleCourse">
      <div className="singleCourseWrapper">
        {course.photo && (
          <img src={PF + course.photo} alt="" className="singleCourseImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={name}
            className="singleCourseTitleInput"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <h1 className="singleCourseTitle">
            {name}
            {user && user.isAdmin && (
              <div className="singleCourseEdit">
                <i
                  className="singlecourseIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleCourseIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singleCourseInfo">
          <span className="singleCourseAuthor"></span>
        </div>
        {updateMode ? (
          <textarea
            className="singleCourseDescInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singleCourseDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singleCourseButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
