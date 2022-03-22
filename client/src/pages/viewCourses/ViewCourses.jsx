import React, { useEffect, useState } from "react";
import Courses from "../../components/courses/Courses";
import axios from "axios";
import Skeleton from "../../components/skeleton/Skeleton";
import "./viewCourses.scss";
import Footer from "../../components/footer/Footer";

export default function ViewCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/course/"
      );
      setCourses(res.data);
      setIsLoading(false);
    };
    fetchCourses();
  });

  return (
    <>
      {isLoading ? (
        <Skeleton type="custom" />
      ) : (
        <div>
          <div className="viewCourses">
            <div className="inner">
              <Courses courses={courses} />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
