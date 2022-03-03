const register = (email, password) => {

};

const login = (email, password) => {
    return fetch("/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                console.log("success")
                localStorage.setItem("user", JSON.stringify(data))
            }
        })
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentSession = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentSession,
};