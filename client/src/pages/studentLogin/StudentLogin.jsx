import "./studentLogin.css";
// import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function StudentLogin() {
  const { dispatch, isFetching } = useContext(Context);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [wrong, setWrong] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    if (!emailRef.current.value) {
      alert("username required");
    } else if (!passwordRef.current.value) {
      alert("password required");
    }
    try {
      const res = await axios.post(
        "https://ictak-project.herokuapp.com/api/auth/login/student",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      // console.log(user);
      console.log(isFetching);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setWrong("Wrong Credentials");
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">STUDENT LOGIN</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Email"
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter password"
          ref={passwordRef}
        />

        <button className="loginButton" type="submit">
          Login
        </button>
      </form>

      <p>{wrong}</p>
    </div>
  );
}
