import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./component/Home-component";
import LoginComponent from "./component/Login-component";
import NavComponent from "./component/Nav-component";
import RegisterComponent from "./component/Register-component";
import ProfileComponent from "./component/Profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./component/Course-component";
import PostCourseComponent from "./component/PostCourse-component";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

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
          path="/course"
          element={
            <CourseComponent
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
      </Routes>
    </div>
  );
}

export default App;
