import "firebase/firestore";
import { initializeApp } from "firebase/app";

var config = {
  apiKey: "AIzaSyCHmxfs9ziOr0_23k-68JfjI-pZeh5BI0w",
  authDomain: "vue-chat-f8c3c.firebaseapp.com",
  projectId: "vue-chat-f8c3c",
  storageBucket: "vue-chat-f8c3c.appspot.com",
  messagingSenderId: "568964945996",
  appId: "1:568964945996:web:f4bb4be06319c6a90b7ce9",
  measurementId: "G-C3VZYJYQBL"
};

var fire = initializeApp(config);
export default fire;
