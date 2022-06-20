import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Learning System</h1>
            <p className="col-md-8 fs-4">
              此作品前端使用React,後端Node.js,資料庫MongoDB。
            </p>
            <p>
              輸入 username、email 及 password 可建立新的帳號，role 輸入 student
              或 instructor 決定身分，密碼會經過 bcypt 進行加密儲存至 MongoDB
              Altas 資料庫中。 輸入 email 及 password 進行登入，登入成功後有 JWT
              儲存在使用者的 Localstorage，API 動作時，會連帶確認 JWT 是否正確。
            </p>

            <a
              className="btn btn-primary"
              target="_blank"
              href="https://github.com/NENG0910/course-client"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a student</h2>
              <p>
                註冊為學生，至Enroll頁面搜尋(目前僅能完整字詞搜尋，ex.
                搜尋course3可搜尋到title為course3的課程)，已註冊後的課程顯示在Profile頁面。
              </p>
              <button
                onClick={handleTakeToLogin}
                className="btn btn-outline-light"
              >
                Login or Register Now
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As an Instructor</h2>
              <p>
                註冊為講師，在Post
                Course頁面登入課程，輸入title,description,price，登入後的課程顯示在Profile頁面。
                課程顯示已註冊學生人數。
              </p>
              <button
                onClick={handleTakeToLogin}
                className="btn btn-outline-secondary"
              >
                Login or Register Now
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          <p>Author's Email:k7351264@gmail.com</p>
          <p>
            Author's
            <a target="_blank" href="https://github.com/NENG0910">
              Github
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
