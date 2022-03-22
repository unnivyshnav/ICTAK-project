import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import StudentLogin from "./pages/studentLogin/StudentLogin";
import EmployeeLogin from "./pages/employeeLogin/EmployeeLogin";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import StudentRegister from "./pages/studentRegister/StudentRegister";

import EmployeeRegister from "./pages/employeeRegister/EmplyeeRegister";
import { useContext } from "react";
import { Context } from "./context/Context";
import Write from "./pages/write/Write";
import Search from "./pages/search/Search";
import ApproveStudent from "./pages/approveStudents/ApproveStudent";

import SearchEmployee from "./pages/searchEmployee/SearchEmployee";
import SingleCourse from "./pages/singleCourse/SingleCourse";
import ViewCourses from "./pages/viewCourses/ViewCourses";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import ApproveEmployee from "./pages/approveEmployee/ApproveEmployee";
import EmployeeProfile from "./pages/employeeProfile/EmployeeProfile";
import Payment from "./components/payment/Payment";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/student-login"
          element={user ? <Home /> : <StudentLogin />}
        />
        <Route
          path="/employee-login"
          element={user ? <Home /> : <EmployeeLogin />}
        />
        <Route path="/admin-login" element={user ? <Home /> : <AdminLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />

        <Route path="/employee-register" element={<EmployeeRegister />} />
        <Route path="/course" element={<Write />} />
        <Route path="/search" element={<Search />} />
        <Route path="/approve" element={<ApproveStudent />} />
        <Route path="/student/:id" element={<StudentProfile />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/course/:id" element={<SingleCourse />} />
        <Route path="/employee" element={<SearchEmployee />} />
        <Route path="/courses" element={<ViewCourses />} />
        <Route path="/employee-approve" element={<ApproveEmployee />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
