// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDMHva8cd_qidUXlEmMqOz5ht2Ias7O9eY",
  authDomain: "react-calendar-dab31.firebaseapp.com",
  databaseURL: "https://react-calendar-dab31-default-rtdb.firebaseio.com",
  projectId: "react-calendar-dab31",
  storageBucket: "react-calendar-dab31.appspot.com",
  messagingSenderId: "1060111489460",
  appId: "1:1060111489460:web:a879a5dd553f156272fae1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
