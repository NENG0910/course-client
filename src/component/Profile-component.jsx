import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const ProfileComponent = (props) => {
  let { currentUser } = props;
  let [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    //設定網址的id /instructor/instructor的id
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    //如果是instructor 就setCourseData，map顯示出instructor的課程
    if (currentUser.user.role === "instructor") {
      CourseService.get(_id)
        .then((data) => {
          setCourseData(data.data);
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role === "student") {
      CourseService.getEnrollCourse(_id)
        .then((data) => {
          setCourseData(data.data);
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      {!currentUser && (
        <div>
          <p>You must login to visit profile page.</p>
          <button onClick={handleTakeToLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
              src="https://picsum.photos/seed/picsum/200"
              alt="Profile Photo"
            />

            <div style={{ padding: "1rem " }} className=" align-items-center">
              <p>
                <strong>User Name : {currentUser.user.username}</strong>
              </p>

              <p>Email : {currentUser.user.email}</p>
            </div>
          </div>

          <div>
            <h3>
              <strong>{currentUser.user.username}，開始學習吧</strong>
            </h3>
            {currentUser && courseData && courseData.length !== 0 && (
              <div>
                {courseData.map((course) => (
                  <div>
                    <div
                      key={course._id}
                      className="card"
                      style={{ width: "18rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">{course.description}</p>
                        <p className="card-text">
                          Student count: {course.students.length}
                        </p>

                        <a className="btn btn-primary">進入課程</a>
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
      )}
    </div>
  );
};

export default ProfileComponent;
