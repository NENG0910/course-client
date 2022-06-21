# Course 前端

作品網址: https://course-client-connect.vercel.app/

---

## 功能介紹:

### 註冊及登入

輸入 username、email 及 password 可建立新的帳號，role 輸入 student 或 instructor 決定身分，密碼會經過 bcypt 進行加密儲存至 MongoDB Altas 資料庫中。  
輸入 email 及 password 進行登入，登入成功後有 JWT 儲存在使用者的 Localstorage，API 動作時，會連帶確認 JWT 是否正確。

### Instructor 建立新的課程

註冊為講師，在 Post
Course 頁面登入課程，輸入 title,description,price，登入後的課程顯示在 Profile 頁面。
課程顯示已註冊學生人數。

### Student 選擇加入課程

註冊為學生，至 Enroll 頁面搜尋(目前僅能完整字詞搜尋，ex.
搜尋 course3 可搜尋到 title 為 course3 的課程)，已註冊後的課程顯示在 Profile 頁面。

---

## 使用工具:

前端使用  
1.React  
2.react-route-dom  
3.Bootstrap  
4.axios  
5.vercel

後端使用  
1.Node.js  
2.express  
3.MongoDB Altas  
4.joi  
5.JWT & passport-jwt  
6.bcrypt  
7.dotenv  
8.cors  
9.heroku

## 發生問題

1.在執行 search button 時，console.log()顯示短時間出現即消失，搜尋功能的結果也無法顯示。  
原因:刪除 form 即可

2.顯示或搜尋課程時，searchData 有 set 進去，但是無法顯示。  
原因：  
course.map(()=>{
}) 的()=>{}需改為()=>()  
可能裡面是 div，不能用{}
