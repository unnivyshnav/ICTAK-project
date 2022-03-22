import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.css";
export default function Navbar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          <img
            src="https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png"
            alt=""
            style={{ width: "35px" }}
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link active" aria-current="page">
                HOME
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link
                to="/courses"
                className="nav-link active"
                aria-current="page"
              >
                COURSES
              </Link>
            </li>

            {!user && (
              <li className="nav-item me-3 dropdown">
                <a
                  className="nav-link  active"
                  href="/"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  LOGIN
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/employee-login">
                      EMPLOYEE
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/admin-login">
                      {" "}
                      ADMIN
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/student-login">
                      {" "}
                      STUDENT
                    </a>
                  </li>
                </ul>
              </li>
            )}

            {!user && (
              <li className="nav-item me-3 dropdown">
                <a
                  className="nav-link  active "
                  href="/"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  REGISTER
                </a>
                <ul
                  className="dropdown-menu "
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <a className="dropdown-item " href="/student-register">
                      STUDENT
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/employee-register">
                      EMPLOYEE
                    </a>
                  </li>
                </ul>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item me-3">
                <Link
                  to="/course"
                  className="nav-link active"
                  aria-current="page"
                >
                  ADD COURSES
                </Link>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item me-3">
                <Link
                  to="/employee"
                  className="nav-link active"
                  aria-current="page"
                >
                  {" "}
                  EMPLOYEES
                </Link>
              </li>
            )}

            {((user && user.isAdmin) || (user && user.isEmployee)) && (
              <li className="nav-item me-3">
                <Link
                  to="/search"
                  className="nav-link active"
                  aria-current="page"
                >
                  {" "}
                  SEARCH STUDENTS
                </Link>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item me-3">
                <Link
                  to="/approve"
                  className="nav-link active"
                  aria-current="page"
                >
                  {" "}
                  APPROVE STUDENTS
                </Link>
              </li>
            )}

            {user && user.isAdmin && (
              <li className="nav-item me-3">
                <Link
                  to="/employee-approve"
                  className="nav-link active"
                  aria-current="page"
                >
                  {" "}
                  APPROVE EMPLOYEES
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            {user && (
              <>
                {user && user.isStudent && (
                  <li className="nav-item me-3">
                    <Link
                      to={`/student/${user._id || ""}`}
                      className="nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      MY PROFILE
                    </Link>
                  </li>
                )}

                {user && user.isEmployee && (
                  <li className="nav-item me-3 right ">
                    <Link
                      to={`/employee/${user._id || ""}`}
                      className="nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      MY PROFILE
                    </Link>
                  </li>
                )}

                <li className="nav-item me-3 right ">
                  <a className="nav-link disabled" href="/">
                    {user.username}
                  </a>
                </li>

                <li className="nav-item me-3" onClick={handleLogout}>
                  <Link to="/" className="nav-link active " aria-current="page">
                    {" "}
                    LOGOUT
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
