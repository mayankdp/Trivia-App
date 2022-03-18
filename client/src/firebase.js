import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAS5aE2dUKtg7ZwbNJOGrjTWXjgeQKN3EA",
    authDomain: "trivia-app-3b605.firebaseapp.com",
    databaseURL: "https://trivia-app-3b605-default-rtdb.firebaseio.com",
    projectId: "trivia-app-3b605",
    storageBucket: "trivia-app-3b605.appspot.com",
    messagingSenderId: "814900564757",
    appId: "1:814900564757:web:20de8dd9e7b0b4b5914f1c",
    measurementId: "G-QQJZJ3FRVF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function register(displayName, email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            console.log("registered")
            localStorage.setItem("user", userCred.user.uid);
            updateProfile(userCred.user, {displayName: displayName})
                .then(() => {
                    console.log("display name added")
                    sendEmailVerification(userCred.user)
                        .then(() => {
                            auth.signOut()
                            alert("email verification link sent")
                        })
                })
        })
        .catch((error) => {
            throw error.message;
        })
}

function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            if (userCred.user.emailVerified) {
                console.log("signed in")
                localStorage.setItem("user", userCred.user.uid)
            } else {
                auth.signOut();
                throw new Error("verify email before logging in")
            }
        })
        .catch((error) => {
            throw error.message;
        })
}

function logout() {
    const auth = getAuth();
    auth.signOut()
        .then(() => {
            localStorage.removeItem("user");
            console.log("logged out");
        })
        .catch((error) => {
            throw error.message;
        })
}

function addData(collectionName, data) {
    try {
        addDoc(collection(db, collectionName), data)
            .then(() => {
                console.log("document written")
            })
    } catch (e) {
        console.error("error adding doc: " + e)
    }
}

function getData(collectionName, documentName) {

}

export {
    addData,
    getData,
    register,
    login,
    logout,
    db,
    auth
}