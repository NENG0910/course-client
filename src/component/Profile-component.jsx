import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = (props) => {
  let { currentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
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
              src="https://picsum.photos/seed/picsum/200/300"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
