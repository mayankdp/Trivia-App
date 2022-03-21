import { useSelector } from "react-redux";

function QuizEnd() {
    const score = useSelector(state => state.score);
    const index = useSelector(state => state.index);

    return (
        <div id="page_placeholder">
            <h2>End of Quiz!</h2>
            <p>Final Score: {score.toFixed(2)} / {index * 2}</p>
        </div>
    )
}

export default QuizEnd;