import "./table.css";
import { Link } from "react-router-dom";

export default function Table({ data }) {
  // const PF = "https://ictak-project.herokuapp.com/images/";
  return (
    <div className="tables">
      {data.map((item) => (
        <Link className="link" to={`/student/${item._id}`}>
          <table className="table table-striped table-hover ">
            <tbody>
              <tr className="">
                <th>Name</th>
                <th>Qualification</th>
                <th>Pass out year</th>
                <th>ICTAK Course</th>
                <th>Place</th>
                <th>Exit Exam Mark</th>
                <th>Employment Status</th>
              </tr>

              <tr className="" key={item._id}>
                <td className="tdLink">
                  {/* <img src={PF + item.photo} alt="profile.pic" /> */}
                  {item.name}
                </td>

                <td>{item.qualification}</td>
                <td>{item.passOutYear}</td>
                <td>{item.course}</td>
                <td>{item.place}</td>
                <td>{item.exitExamMark}</td>
                <td>{item.employmentStatus}</td>
              </tr>
            </tbody>
          </table>
        </Link>
      ))}
    </div>
  );
}
