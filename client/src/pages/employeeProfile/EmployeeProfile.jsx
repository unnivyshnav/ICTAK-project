import "./employeeProfile.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";

export default function EmployeeProfile() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [employee, setEmployee] = useState({});
  const [relod, setReload] = useState(false);
  const [photo, setPhoto] = useState("");
  const PF = "https://ictak-project.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [passOutYear, setPassoutyear] = useState("");
  const [skillSet, setSkillset] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setCourse] = useState("");
  useEffect(() => {
    const getEmployee = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/employee/find/" + path,
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setEmployee(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setPlace(res.data.place);
      setAddress(res.data.address);
      setQualification(res.data.qualification);
      setPassoutyear(res.data.passOutYear);
      setSkillset(res.data.skillSet);
      setEmploymentStatus(res.data.employmentStatus);
      setYear(res.data.year);
      setPassword(res.data.password);
      setCourse(res.data.course);
      setPhoto(res.data.photo);
      setRole(res.data.role);
      console.log(res.data);
    };
    console.log(role);
    getEmployee();
  }, [path, relod]); // eslint-disable-line react-hooks/exhaustive-deps

  const handledelete = async () => {
    try {
      await axios.delete(
        `https://ictak-project.herokuapp.com/api/employee/${employee._id}`,

        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );

      window.location.replace("/search");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://ictak-project.herokuapp.com/api/employee/${employee._id}`,
        {
          name,
          email,
          phone,
          place,
          address,
          qualification,
          skillSet,
          employmentStatus,
          year,
          password,
          course,
          photo,
          role,
        },
        {
          headers: { token: "Bearer " + user.accessToken },
        }
      );
      setUpdateMode(false);

      setReload(!relod);
    } catch (err) {}
  };
  return (
    <div className="allWrap">
      <div className="employeeProfile mx-5 ">
        <div className="container-fluid">
          <div className="row gutters mx-5">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar">
                        <img src={PF + photo} alt="Maxwell Admin" />
                      </div>
                      <h5 className="user-name">{employee.name}</h5>
                      <h6 className="user-email">{employee.email}</h6>
                    </div>
                    <div className="user-profile">
                      {updateMode ? (
                        <div>
                          <input
                            placeholder="Enter new role"
                            name="mark"
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <span>
                            <button onClick={handleUpdate}>Update</button>
                          </span>
                        </div>
                      ) : (
                        <h4>
                          {role}
                          <span>
                            {user && user.isAdmin && (
                              <i
                                className="singleCourseIcon far fa-edit"
                                onClick={() => setUpdateMode(true)}
                              ></i>
                            )}
                          </span>{" "}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">
                        View and edit Personal Details
                      </h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          autoFocus
                          type="text"
                          className="form-control"
                          id="fullName"
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={phone || ""}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Place</label>
                        <input
                          type="url"
                          className="form-control"
                          value={place || ""}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          rows={4}
                          type="name"
                          className="form-control"
                          value={address || ""}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group col-xl-12">
                            <label>Qualification</label>
                            <input
                              type="name"
                              className="form-control"
                              value={qualification || ""}
                              onChange={(e) => setQualification(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-xl-12">
                            <label>Pass-out year</label>
                            <input
                              type="text"
                              className="form-control"
                              value={passOutYear || ""}
                              onChange={(e) => setPassoutyear(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Course</label>
                        <input
                          type="text"
                          className="form-control"
                          value={course || ""}
                          onChange={(e) => setCourse(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={year || ""}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Employment Status</label>
                        <select
                          type="text"
                          className="form-control"
                          value={employmentStatus || ""}
                          onChange={(e) => setEmploymentStatus(e.target.value)}
                        >
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Skillset</label>
                        <input
                          type="text"
                          className="form-control"
                          value={skillSet || ""}
                          onChange={(e) => setSkillset(e.target.value)}
                        />
                      </div>
                    </div>
                    {user && user.isEmployee && (
                      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    {user && user.isEmployee && (
                      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right ">
                        {user && user.isAdmin && (
                          <button
                            type="button"
                            onClick={handledelete}
                            name="submit"
                            className="btn btn-danger mt-5 px-5 float-end "
                          >
                            Delete
                          </button>
                        )}
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-secondary mt-5 px-5 me-5 float-end "
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          onClick={handleUpdate}
                          className="btn btn-primary mt-5 px-5 mx-5 float-end"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
