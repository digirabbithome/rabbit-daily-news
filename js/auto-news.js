
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.firebasestorage.app",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleNews = [
  {
    title: "ZITAY 推出全新電池轉接座！",
    summary: "支援多種電壓轉接，適用各類型專業攝影機設備。",
    image: "https://www.zitay.com/uploads/allimg/220423/1-22042314403H00.jpg"
  },
  {
    title: "CINED 發佈最新專訪：電影燈光師分享拍攝經驗",
    summary: "深入了解電影燈光配置的幕後祕辛，專業內容不容錯過！",
    image: "https://www.cined.com/wp-content/uploads/2024/01/sample.jpg"
  }
];

const container = document.getElementById("newsContainer");

sampleNews.forEach((news, index) => {
  const card = document.createElement("div");
  card.className = "news-card";
  card.innerHTML = `
    <h2 contenteditable="true">${news.title}</h2>
    <textarea>${news.summary}</textarea>
    <img src="${news.image}" alt="news image" />
    <button>發佈這則消息</button>
  `;
  const btn = card.querySelector("button");
  btn.onclick = async () => {
    const title = card.querySelector("h2").innerText;
    const summary = card.querySelector("textarea").value;
    const image = card.querySelector("img").src;
    await addDoc(collection(db, "news"), {
      title,
      summary,
      image,
      timestamp: new Date()
    });
    alert("已成功發佈！");
  };
  container.appendChild(card);
});
