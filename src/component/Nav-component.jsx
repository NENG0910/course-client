import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import CourseService from "../services/course.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser, searchResult, setSearchResult } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout successfully.");
    setCurrentUser(null);
    navigate("/");
  };
  let [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
        console.log(data.data);
        navigate("/enroll");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            Course
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link" href="/#">
                    Logout
                  </a>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </li>
              )}

              {currentUser && currentUser.user.role === "instructor" && (
                <li className="nav-item">
                  <a className="nav-link" href="/postCourse">
                    Post Course
                  </a>
                </li>
              )}
              {currentUser && currentUser.user.role === "student" && (
                <li className="nav-item">
                  <a className="nav-link" href="/enroll">
                    Enroll
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
