import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CouresService from "../services/course.service";

const PostCourseComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handlePostCourse = () => {
    CouresService.postCourse(title, description, price)
      .then(() => {
        window.alert("Post a new course.");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data);
      });
  };

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login to visit profile page.</p>
          <button onClick={handleTakeToLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChangeTitle}
              type="text"
              className="form-control"
              name="title"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleforContent">Content</label>
            <textarea
              onChange={handleChangeDescription}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="content"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChangePrice}
              type="number"
              className="form-control"
              name="price"
            />
          </div>
          <br />
          <button onClick={handlePostCourse} className="btn btn-primary">
            <span>Post Course</span>
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
