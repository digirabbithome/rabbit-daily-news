import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore, collection, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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

const container = document.getElementById("news-container");
const q = query(collection(db, "news"), orderBy("timestamp", "desc"));

getDocs(q).then((snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${data.image}" alt="news image" />
      <h2>${data.title}</h2>
      <p class="news-summary">${data.summary}</p>
    `;
    container.appendChild(card);
  });
});
