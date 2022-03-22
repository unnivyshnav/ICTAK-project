import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeTable({ data }) {
  return (
    <div>
      {" "}
      {data.map((item) => (
        <Link className="link" to={`/employee/${item._id}`}>
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
              </tr>

              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  {item.email}
                  <br />
                  {item.phone}
                </td>
              </tr>
            </tbody>
          </table>
        </Link>
      ))}
    </div>
  );
}
