import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    console.log(role);
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("Registration successds.You are now redirected to login.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      <div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
            placeholder="至少3個字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
            placeholder="至少6個字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="至少6個字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">Role</label>
          {/* <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            name="role"
          /> */}
          {/*onChange的值要放在select，不是option */}
          <select className="form-select" onChange={handleChangeRole}>
            <option selected>Are you instructor or student?</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
