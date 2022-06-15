import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, courseData, setCourseData } = props;
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
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ padding: "3rem" }}>
          <p>You must login brfore to see your course</p>
          <button onClick={handleTakeToLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <p>This is {currentUser.user.role} 's page.</p>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <p>This is {currentUser.user.role} 's page.</p>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          <p>Here's the data from sever</p>
          {courseData.map((course) => (
            <div>
              <div key={course._id} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    Student count: {course.students.length}
                  </p>
                  <p className="card-text">Price: NT{course.price}</p>
                  <a className="btn btn-primary">Price: NT{course.price}</a>
                </div>
              </div>
              <br />
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
