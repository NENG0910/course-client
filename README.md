# Course 前端

---

## 功能介紹:

### 註冊及登入

輸入 username、email 及 password 可建立新的帳號，role 輸入 student 或 instructor 決定身分，密碼會經過 bcypt 進行加密儲存至 MongoDB Altas 資料庫中。  
輸入 email 及 password 進行登入，登入成功後有 JWT 儲存在使用者的 Localstorage，API 動作時，會連帶確認 JWT 是否正確。

### Instructor 建立新的課程

### Student 選擇加入課程

---

## 使用工具:

1.React  
2.react-route-dom  
3.Bootstrap  
4.axios

## 發生問題

1.在執行 search button 時，console.log()顯示短時間出現即消失，搜尋功能的結果也無法顯示。  
原因:刪除 form 即可
