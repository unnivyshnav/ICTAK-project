import "./studentRegister.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { pattern } from "../../validation/validation";
import { errorMessage } from "../../validation/validation";
// import Payment from "../../components/payment/Payment";

export default function StudentRegister() {
  /////////////////////
  // payment//////////
  ////////////////////

  const book = {
    name: "The Fault in our stars",
    author: " Vyshnav",
    img: "https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png",
  };
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_oFO1alVZCivFv0",
      amount: data.amount,
      currency: data.currency,
      name: formValues.course,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
            "https://ictak-project.herokuapp.com/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          window.location.replace("/");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
      prefill: {
        name: formValues.name,
        email: formValues.email,
        contact: formValues.phone,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "https://ictak-project.herokuapp.com/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: formValues.fee });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////
  /////payment end///////
  //////////////////////

  const [courses, setCourses] = useState([]);
  // const [wrong, setWrong] = useState("");
  const [focused, setFocused] = useState(false);
  const [paymentMode, setPaymentMode] = useState(false);
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        "https://ictak-project.herokuapp.com/api/course/"
      );
      setCourses(res.data);
    };
    fetchCourses();
  });
  const [fee, setFee] = useState("");
  const [respnse, setResponse] = useState("");

  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    place: "",
    address: "",
    qualification: "",
    passOutYear: "",
    skillSet: "",
    employmentStatus: "",
    technologyTraining: "",
    year: "",
    course: "",
    photo: "",
    fee: "",
  });
  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  const handleCourse = (event) => {
    setCourse(event.target.value);

    // console.log(course);
  };
  useEffect(() => {
    courses.forEach((o) => {
      if (o.name === course) {
        setFee(o.fee);
      }

      if (course === "noSelection") {
        setFee("0");
      }
    });
  }, [course]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    formValues.course = course;
    formValues.fee = fee;
    // console.log(formValues);
    setFocused(true);
    setPaymentMode(true);

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      formValues.photo = filename;
      try {
        await axios.post(
          "https://ictak-project.herokuapp.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "https://ictak-project.herokuapp.com/api/auth/student-register",
        formValues
      );

      setResponse(res.data);

      // window.location.replace("/student-login");
    } catch (err) {
      console.log(err);
      // setWrong("email id already exist");
    }
  };
  // console.log(focused);

  return (
    <>
      {paymentMode && respnse.isStudent ? (
        <div className="App">
          <div className="book_container">
            <img src={book.img} alt="book_img" className="book_img" />
            <p className="book_name">{formValues.course}</p>
            <p className="book_author">ICT Academy</p>
            <p className="book_price">
              Price : <span>&#x20B9; {formValues.fee}</span>
            </p>
            <button onClick={handlePayment} className="buy_btn">
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <div className="studentRegister container-fluid">
          <span className="registerTitle">Register</span>
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
                      pattern={pattern.password}
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
                  <div className="formInput col-sm">
                    <label>Place</label>
                    <input
                      type="text"
                      name="place"
                      className="registerInput"
                      required="true"
                      onChange={handleChange}
                      onBlur={handleFocus}
                      focused={focused.toString()}
                      onFocus={() => setFocused(false)}
                    />
                    <span className="error">{errorMessage.others}</span>
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
                    <span className="error">{errorMessage.others}</span>
                  </div>
                  <div className="formInput col-sm">
                    <label>Qualification</label>
                    <input
                      type="text"
                      name="qualification"
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
                    <label>Pass-Out year</label>
                    <input
                      type="text"
                      name="passOutYear"
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
                    <label>Skillset</label>
                    <input
                      type="text"
                      name="skillSet"
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
                    <label>Employment Status</label>
                    <select
                      type="text"
                      name="employmentStatus"
                      className="registerInput"
                      required="true"
                      onChange={handleChange}
                      onFocus={() => setFocused(false)}
                    >
                      <option value="">Select</option>
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                    <span className="error">{errorMessage.option}</span>
                  </div>
                </div>
                <div className="formItemscol col-3">
                  <div className="formInput col-sm">
                    <label>Technology Training</label>
                    <input
                      type="text"
                      name="technologyTraining"
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
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
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
                    <label>Course</label>
                    <select
                      type="text"
                      name="course"
                      className="registerInput"
                      required="true"
                      onChange={handleCourse}
                    >
                      <option value="noSelection">Select a Course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course.name}>
                          {course.name}
                        </option>
                      ))}{" "}
                    </select>

                    <span className="error">{errorMessage.option}</span>
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
                  </div>{" "}
                  <div className="formInput col-sm">
                    <label>Fee</label>
                    <input
                      type="text"
                      name="fee"
                      className="registerInput"
                      onChange={handleChange}
                      disabled={true}
                      required="true"
                      value={fee}
                    />
                    <span className="error">{errorMessage.others}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <button className="registerButton col-6 mx-4" type="submit">
                REGISTER
              </button>{" "}
              {/* <button className="registerButton col-6 mx-4">
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </button> */}
            </div>
            <div className="row d-flex justify-content-center">
              {" "}
              {/* <p className=" col-6 mx-4 wrong ">{wrong}</p> */}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
