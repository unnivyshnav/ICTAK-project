import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./approveEmployee.css";
import axios from "axios";
export default function ApproveEmployee() {
  const { user } = useContext(Context);
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/employee/approve",
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setEmployees(res.data);
    };
    fetchEmployees();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (event) => {
    setId(event.target.value);
  };

  const handleDelete = async (event) => {
    setId(event.target.value);

    try {
      await axios.delete(
        `https://ictak-project.herokuapp.com/api/employee/${id}`,

        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );

      setId("00");
    } catch (err) {}
  };

  useEffect(() => {
    const approveEmployee = async () => {
      if (id) {
        try {
          await axios.put(
            `https://ictak-project.herokuapp.com/api/employee/approve/${id}`,
            {},
            {
              headers: { token: "Bearer " + user.accessToken },
            }
          );
        } catch (err) {}
      }
      setId("00");
    };
    approveEmployee();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="approveEmployee">
      <h1>Approve Employee</h1>
      <table className="table table-dark table-hover">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>

            <th>Action</th>
          </tr>
          {employees.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>

              <td>
                <button
                  className="btn btn-success"
                  value={item._id}
                  onClick={handleClick}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger mx-2"
                  value={item._id}
                  onClick={handleDelete}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
