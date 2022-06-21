import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";
class CourseService {
  //POST post課程
  postCourse(title, description, price) {
    //讓axios攜帶jwt去server
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      //第二個參數為req.body
      { title, description, price },
      {
        //同postman作法
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getEnrollCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  //搜尋課程
  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  //GET 在Profile page顯示instructor的post course
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  enroll(_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/enroll/" + _id,
      {
        user_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //GET 顯示所有課程
  getAllCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/", {
      headers: {
        Authorization: token,
      },
    });
  }
  //DELETE 刪除課程
  deleteCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(
      API_URL + "/" + _id,

      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
