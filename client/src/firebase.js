import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyAS5aE2dUKtg7ZwbNJOGrjTWXjgeQKN3EA",
    authDomain: "trivia-app-3b605.firebaseapp.com",
    databaseURL: "https://trivia-app-3b605-default-rtdb.firebaseio.com",
    projectId: "trivia-app-3b605",
    storageBucket: "trivia-app-3b605.appspot.com",
    messagingSenderId: "814900564757",
    appId: "1:814900564757:web:20de8dd9e7b0b4b5914f1c",
    measurementId: "G-QQJZJ3FRVF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    app,
    analytics,
    db
}