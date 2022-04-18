import { auth, getUserScore } from "../firebase";
import React, { useEffect, useState } from "react";

function Profile() {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        console.log(user);
        getUserScore(user.uid)
            .then((data) => {
                console.log(data);
                setUserData(data);
                setLoading(false)
            });
    }, []);

    if (loading) {
        return (
            <div>
                <div id="page_placeholder">
                    <h2>Profile Placeholder</h2>
                    <p>Display Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div id="page_placeholder">
                    <h2>Profile Placeholder</h2>
                    <p>Display Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                </div>

                <div id="leaderboard_page">
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
                                console.log(doc.id);
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
            </div>
        );
    }
}

export default Profile;