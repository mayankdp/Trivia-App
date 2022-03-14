import React, { useState, useEffect } from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from './components/home';
import Leaderboard from "./components/leaderboard";
import Profile from "./components/profile";
import Setup from "./components/setup";
import Question from "./components/question";
import Quiz from "./components/quiz";
import QuizEnd from "./components/quiz-end";
import AuthService from "./services/auth-service";
import './style.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const session = AuthService.getCurrentSession();
        if (session) setLoggedIn(true);
    }, []);

    const logout = () => {
        AuthService.logout();
        setLoggedIn(false);
    }

    return (
        <BrowserRouter>
            <nav>
                <ul id="navbar">
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Home
                        </NavLink>
                    </li>
                    {!loggedIn && (
                        <li>
                            <NavLink
                                to="/login"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                    {!loggedIn && (
                        <li>
                            <NavLink
                                to="/register"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Register
                            </NavLink>
                        </li>
                    )}
                    {loggedIn && (
                        <li>
                            <NavLink
                                to="/profile"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Profile
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/setup"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Quiz
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/leaderboard"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                    {loggedIn && (
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/setup" element={<Setup />}/>
                    <Route path="/question" element={<Question />}/>
                    <Route path="/quiz" element={<Quiz />}/>
                    <Route path="/quiz-end" element={<QuizEnd />}/>
                    <Route path="/leaderboard" element={<Leaderboard />}/>
                </Routes>
            </nav>
        </BrowserRouter>
    );
}

export default App;
