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
  //按下進入課程，顯示alert，此功能尚未開發，敬請期待
  const handleEnterCourse = () => {
    window.alert("課程專屬頁面尚未開發，敬請期待．");
  };
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
              <p>Role: {currentUser.user.role}</p>
            </div>
          </div>

          <div>
            {currentUser.user.role == "instructor" && (
              <div>
                <h3>
                  <strong>{currentUser.user.username}，管理您的課程</strong>
                </h3>
              </div>
            )}
            {currentUser.user.role === "student" && (
              <div>
                <h3>
                  <strong>{currentUser.user.username}，開始學習吧</strong>
                </h3>
              </div>
            )}

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
                        <div className="d-flex">
                          <button
                            onClick={handleEnterCourse}
                            className="btn btn-primary"
                            style={{ margin: "1px" }}
                          >
                            進入課程
                          </button>
                          {currentUser.user.role === "instructor" && (
                            <div>
                              <button
                                className="btn btn-primary"
                                style={{ margin: "1px" }}
                              >
                                編輯課程
                              </button>
                            </div>
                          )}
                        </div>
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
