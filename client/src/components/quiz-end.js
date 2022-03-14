import { useSelector } from "react-redux";

function QuizEnd() {
    const score = useSelector(state => state.score);
    const index = useSelector(state => state.index);

    return (
        <div className="placeholder">
            <h2>End of Quiz!</h2>
            <p>Final Score: {score} / {index}</p>
        </div>
    )
}

export default QuizEnd;