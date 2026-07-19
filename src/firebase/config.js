import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTZu5lO2nPz_m4NKDFjSlctkgnTUSHBOA",
  authDomain: "e-commerce-project-kodecamp.firebaseapp.com",
  projectId: "e-commerce-project-kodecamp",
  storageBucket: "e-commerce-project-kodecamp.firebasestorage.app",
  messagingSenderId: "224048961034",
  appId: "1:224048961034:web:5105d20749de71898b71f3",
  measurementId: "G-KPDVLY9GYC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
