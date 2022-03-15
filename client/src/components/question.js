import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const decodeHTML = function (html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
}

function Question() {
    const [questions, setQuestions] = useState([])
    const [choices, setChoices] = useState([])
    const [chosenAnswer, setChosenAnswer] = useState("")
    const [choiceSelected, setChoiceSelected] = useState(false)

    const index = useSelector(state => state.index);
    const score = useSelector(state => state.score);
    const encodedQuestions = useSelector((state) => state.questions)

    const dispatch = useDispatch();
    const question = questions[index];
    const correct = question && question.correct_answer;

    useEffect(() => {
        const decodedQuestions = encodedQuestions.map(q => {
            return {
                ...q,
                question: decodeHTML(q.question),
                correct_answer: decodeHTML(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
            }
        })

        setQuestions(decodedQuestions)
    }, [encodedQuestions])

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    useEffect(() => {
        if (!question) {
            return;
        }

        let answers = [...question.incorrect_answers]
        answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)

        setChoices(answers)
    }, [question])

    const handleListItemClick = (event) => {
        setChoiceSelected(true)
        setChosenAnswer(event.target.textContent)

        if (event.target.textContent === correct) {
            dispatch({
                type: 'SET_SCORE',
                score: score + 1
            })
        }

        if (index + 1 <= questions.length) {
            setTimeout(() => {
                setChoiceSelected(false);
                setChosenAnswer(null);

                dispatch({
                    type: 'SET_INDEX',
                    index: index + 1
                })
            }, 2500)
        }
    }

    const getClass = (choice) => {
        if (!choiceSelected) {
            return ``
        } else if (choice === correct) {
            return `correct`
        } else if (choice === chosenAnswer) {
            return `incorrect`
        }
    }

    if (!question) {
        return (<div>Loading...</div>)
    }
    else {
        return (
            <div id="question">
                <p>Question {index + 1}:</p>
                <h3>{question.question}</h3>
                <ul>
                    {choices.map((choice, i) => (
                        <li key={i} onClick={handleListItemClick} className={getClass(choice)}>
                            {choice}
                        </li>
                    ))}
                </ul>
                <div id="score">
                    Score: {score} / {questions.length}
                </div>
            </div>
        )
    }
}

export default Question;