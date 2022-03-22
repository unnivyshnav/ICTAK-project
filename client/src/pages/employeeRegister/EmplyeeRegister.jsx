import "./employeeRegister.css";
import { useState } from "react";
import axios from "axios";
import { pattern } from "../../validation/validation";
import { errorMessage } from "../../validation/validation";

export default function EmployeeRegister() {
  const [file, setFile] = useState(null);
  const [focused, setFocused] = useState(false);
  //Manage form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    photo: "",
  });
  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      formValues.photo = filename;
      console.log(formValues.photo);
      try {
        await axios.post(
          "https://ictak-project.herokuapp.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "https://ictak-project.herokuapp.com/api/auth/employee-register",
        formValues
      );
      console.log(res);
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <>
      <div className="employeeRegister container-fluid">
        <span className="registerTitle">REGISTER</span>
        <form className="registerForm  container" onSubmit={handleSubmit}>
          <div className="col-12 ">
            <div className="formcol row d-flex justify-content-center">
              <div className="formItemscol col-sm">
                <div className="formInput col-sm">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="registerInput"
                    onChange={handleChange}
                    required="true"
                    onBlur={handleFocus}
                    onFocus={() => setFocused(false)}
                    focused={focused.toString()}
                  />
                  <span className="error">{errorMessage.others}</span>
                </div>
                <div className="formInput col-sm">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="registerInput"
                    required="true"
                    onChange={handleChange}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                    onFocus={() => setFocused(false)}
                  />
                  <span className="error">{errorMessage.email}</span>
                  <label>Password</label>
                </div>
                <div className="formInput col-sm">
                  <input
                    type="password"
                    name="password"
                    className="registerInput"
                    required="true"
                    onChange={handleChange}
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    onBlur={handleFocus}
                    focused={focused.toString()}
                    onFocus={() => setFocused(false)}
                    oninvalid="setCustomValidity('Must be 4 Characters')"
                    oninput="setCustomValidity('')"
                  />
                  <span className="error">{errorMessage.password}</span>
                </div>
                <div className="formInput col-sm">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="registerInput"
                    required="true"
                    onChange={handleChange}
                    pattern={pattern.phone}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                    onFocus={() => setFocused(false)}
                  />
                  <span className="error">{errorMessage.phone}</span>
                </div>
              </div>
              <div className="formItemscol col-3">
                <div className="formInput col-sm">
                  <label>Address</label>
                  <textarea
                    rows="5"
                    type="text"
                    name="address"
                    className="registerInput address"
                    required="true"
                    onChange={handleChange}
                    onFocus={() => setFocused(false)}
                  ></textarea>
                  {/* <span className="error">{errorMessage.others}</span> */}
                </div>
                <div className="formInput col-sm">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    className="registerInput"
                    required="true"
                    onChange={handleChange}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                    onFocus={() => setFocused(false)}
                  />

                  <span className="error">{errorMessage.others}</span>
                </div>
                <div className="formInput col-sm">
                  <label>Photo</label>
                  <input
                    type="file"
                    name="photo"
                    className="registerInput"
                    required="true"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <span className="error">{errorMessage.others}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center ">
            <button className="registerButton col-6 mx-4" type="submit">
              REGISTER
            </button>
          </div>
        </form>
      </div>
      )
    </>
  );
}
