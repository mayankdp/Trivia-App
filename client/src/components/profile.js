import { auth, getUserScore, setNewDisplayName } from "../firebase";
import React, { useEffect, useState } from "react";
import "./profile.css"

function Profile() {

    const user = auth.currentUser;
    // const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    const [showEdit, setShowEdit] = useState(true);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [scoreShow, setScoreShow] = useState(true);

    useEffect(() => {
        // console.log(user);
        getUserScore(user.uid)
            .then((data) => {
                // console.log(data);
                setUserData(data);
                // setLoading(false)
            });
    }, []);

    const editName = (e) => {
        setShowEdit(!showEdit);
    }
    const nameChange = (e) => {
        setDisplayName(e.target.value)
    }
    const confirmName = () => {
        console.log(displayName);
        setNewDisplayName(displayName, user.uid)
        setShowEdit(!showEdit);
    }


    const showScore = () => {
        console.log("Here");
        setScoreShow(!scoreShow)
    }

    return (
        <div id="profile_page" className="page_placeholder">
            <div id="profile_info">
                <h3>Profile Information</h3>
                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>

                {showEdit === true ? (
                    <div>
                        <label className="action_btn" onClick={editName}>&ensp;Edit&ensp;</label>
                    </div>
                ) : (
                    <div>
                        <form>
                            <label for="fname">Edit Display Name:{" "}
                                <input type="text" id="fname" name="fname"
                                    onChange={nameChange}>
                                </input> <br></br>
                            </label>
                        </form>
                        <form className="buttons">
                            <p className="action_btn" onClick={editName}>Cancel</p>
                            <p className="action_btn" onClick={confirmName}>Confirm</p>
                        </form>
                    </div>
                )}
                {scoreShow === true ? (
                    <label for="fname">
                        <label>View your Past quizzes score&ensp;</label>
                        <label className="clickme" onClick={showScore}>&ensp;Click Here!&ensp;</label>
                    </label>
                ) : (
                    <label for="fname">
                        <label>Hide your score&ensp;</label>
                        <label className="clickme" onClick={showScore}>&ensp;Click Here!&ensp;</label>
                    </label>
                )}
            </div>

            {scoreShow === false ? (
                <div id="leaderboard_page">
                    <h3>Past Quizzes</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Quiz ID</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Difficulty</th>
                                <th>Question Amount</th>
                                <th>Question Type</th>
                                <th>Time Limit</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((doc) => {
                                return (
                                    <tr key={doc.id}>
                                        <td>{doc.id}</td>
                                        <td>{doc.date.toDate().toLocaleString('en-US')}</td>
                                        <td>{doc.category}</td>
                                        <td>{doc.difficulty}</td>
                                        <td>{doc.question_number}</td>
                                        <td>{doc.question_type}</td>
                                        <td>{doc.time_limit}</td>
                                        <td>{doc.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    )
}

export default Profile;
