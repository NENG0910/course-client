import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEnroll = (e) => {
    console.log(e.target.id);

    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("Done Enroll.");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="d-flex" role="search">
        <input
          onChange={handleSearchInput}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          onClick={handleSearch}
          className="btn btn-outline-success"
          type="submit"
        >
          Search
        </button>
      </div>
      <div>
        {!currentUser && (
          <div style={{ padding: "3rem" }}>
            <p>You must login brfore to see your course</p>
            <button onClick={handleTakeToLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        )}
        {currentUser && searchResult && searchResult.length !== 0 && (
          <div>
            <p>Here's the data from sever</p>
            {searchResult.map((course) => (
              <div key={course._id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <p className="card-text">
                      Student count: {course.students.length}
                    </p>
                    <p className="card-text">Price: NT{course.price}</p>
                    {/* id=course.id 點選a的時候，讓e.target.id指向course.id */}
                    <a
                      onClick={handleEnroll}
                      className="btn btn-primary"
                      id={course._id}
                    >
                      Enroll
                    </a>
                  </div>
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollCourseComponent;
