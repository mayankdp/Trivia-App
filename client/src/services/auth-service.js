import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const register = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log("registered")
            localStorage.setItem("user", user.uid);
        })
        .catch((error) => {
            throw error.message;
        })
};

const login = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log("signed in")
            localStorage.setItem("user", user.uid);
        })
        .catch((error) => {
            throw error.message;
        })
};

const logout = () => {
    const auth = getAuth();
    auth.signOut()
        .then(() => {
            localStorage.removeItem("user");
            console.log("logged out");
        })
        .catch((error) => {
            throw error.message;
        })
};

export default {
    register,
    login,
    logout
};