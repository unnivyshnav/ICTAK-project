import "./adminLogin.css";
// import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function StudentLogin() {
  const { dispatch, isFetching } = useContext(Context);
  const userRef = useRef();
  const passwordRef = useRef();
  const [wrong, setWrong] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    if (!userRef.current.value) {
      alert("username required");
    } else if (!passwordRef.current.value) {
      alert("password required");
    }
    try {
      const res = await axios.post(
        "https://ictak-project.herokuapp.com/api/auth/login/admin",
        {
          username: userRef.current.value,
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
      <span className="loginTitle">ADMIN LOGIN</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Username"
          ref={userRef}
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
