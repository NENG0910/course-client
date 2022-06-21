import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  let { setCurrentUser } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert(
          "Login successfully, you are now redirected to the profile page."
        );
        setCurrentUser(AuthService.getCurrentUser());

        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
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
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
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
          />
        </div>
        <br />
        <button onClick={handleLogin} className="btn btn-primary">
          <span>Login</span>
        </button>
        <br />
        <p>instructor測試帳號：654321@gmail.com 密碼：654321</p>
        <p>student測試帳號：123456@gmail.com 密碼：123456</p>
        <p>
          第一次使用網站功能(登入註冊帳號等與後端連接功能)會延遲數秒，請稍待主機開啟
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
