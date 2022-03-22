import "./searchEmployee.css";

import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import Skeleton from "../../components/skeleton/Skeleton";

import axios from "axios";
import EmployeeTable from "../../components/employeeTable/EmployeeTable";

export default function SearchEmployee() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/employee",
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setEmployees(res.data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const search = (data) => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
  };
  return (
    <div className="searchmainWrapp">
      {isLoading ? (
        <Skeleton type="custom" />
      ) : (
        <div className="searchmain">
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <span></span>
          <EmployeeTable data={search(employees)} />
        </div>
      )}
    </div>
  );
}
