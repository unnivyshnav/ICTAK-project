import "./search.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import Skeleton from "../../components/skeleton/Skeleton";

import axios from "axios";
import Table from "../../components/table/Table";

export default function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Context);
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  // const keys = [
  //   "name",
  //   "qualification",
  //   "passOutYear",
  //   "course",
  //   "place",
  //   "exitExamMark",
  //   "EmploymentStatus",
  // ];

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/student/",
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setStudents(res.data);
      setIsLoading(false);
    };
    fetchStudents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const search = (data) => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.qualification.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query) ||
        item.exitExamMark.includes(query) ||
        item.passOutYear.includes(query) ||
        item.place.toLowerCase().includes(query) ||
        item.employmentStatus.toLowerCase().startsWith(query)
    );
  };
  return (
    <div className="searchmainWrap">
      {isLoading ? (
        <Skeleton type="custom" />
      ) : (
        <div className="searchmain">
          {" "}
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <span></span>
          <Table data={search(students)} />
        </div>
      )}
    </div>
  );
}
