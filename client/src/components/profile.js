import { auth, getLeaderboardData } from "../firebase";
import React, { useEffect, useState } from "react";

function Profile() {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const [docsArray, setDocsArray] = useState([]);

    useEffect(() => {
        let filter = {uid: user.uid}

        getLeaderboardData(filter)
            .then((data) => {
                setDocsArray(data)
                setLoading(false)
            })

    }, [])

    return (
        <div id="profile_page" className="page_placeholder">
            <div id="profile_info">
                <h3>Profile Information</h3>
                <p>Display Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
            </div>

            {!loading && (
                <div id="past_quizzes">
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
                        {docsArray && docsArray.map((doc) => {
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
            )}
        </div>
    );
}

export default Profile;