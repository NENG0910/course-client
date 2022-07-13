import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./component/Home-component";
import LoginComponent from "./component/Login-component";
import NavComponent from "./component/Nav-component";
import RegisterComponent from "./component/Register-component";
import ProfileComponent from "./component/Profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./component/Course-component";
import PostCourseComponent from "./component/PostCourse-component";
import EnrollCourseComponent from "./component/EnrollCourse-component";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [courseData, setCourseData] = useState(null);
  function timeToLogOut() {
    let startTime;
    if (localStorage.getItem("user")) {
      startTime = JSON.parse(localStorage.getItem("user")).startTime;
    } else {
      startTime = "";
    }
    let time = Date.now() - startTime;
    if (time > 600000) {
      AuthService.logout();
    }
    console.log("現在時間： " + Date.now());
    console.log("登入時間： " + startTime);
    console.log("相差： " + time);
  }
  useEffect(() => {
    timeToLogOut();
    console.log(Date.now());
  }, []);

  console.log(currentUser);
  return (
    <div className="App">
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomeComponent />} exact />
        <Route path="/register" element={<RegisterComponent />} exact />
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          exact
        />
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          exact
        />

        <Route
          path="/postCourse"
          element={
            <PostCourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          exact
        />
        <Route
          path="/enroll"
          element={
            <EnrollCourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
          exact
        />
        <Route path="/*" element="該頁面不存在，404 not dound" />
      </Routes>
    </div>
  );
}

export default App;
