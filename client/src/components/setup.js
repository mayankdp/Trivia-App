import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetQuestions from "../services/get-questions-service";

function Setup() {
    const dispatch = useDispatch();
    const [options, setOptions] = useState(null);
    const loading = useSelector(state => state.options.loading);
    const category = useSelector(state => state.options.category);
    const difficulty = useSelector(state => state.options.difficulty);
    const qtype = useSelector(state => state.options.qtype);
    const number = useSelector(state => state.options.number);

    useEffect(() => {
        const api_url = `https://opentdb.com/api_category.php`;
        const handleLoadingChange = (value) => {
            dispatch({
                type: 'CHANGE_LOADING',
                loading: value
            })
        }
        handleLoadingChange(true);

        fetch(api_url)
            .then((res) => res.json())
            .then((res) => {
                handleLoadingChange(false);
                setOptions(res.trivia_categories);
            });
    }, [setOptions, dispatch]);

    const handleCategoryChange = (event) => {
        dispatch({
            type: 'CHANGE_CATEGORY',
            value: event.target.value
        })
    }

    const handleDifficultyChange = (event) => {
        dispatch({
            type: 'CHANGE_DIFFICULTY',
            value: event.target.value
        })
    }

    const handleTypeChange = (event) => {
        dispatch({
            type: 'CHANGE_TYPE',
            value: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        dispatch({
            type: 'CHANGE_NUMBER',
            value: event.target.value
        })
    }

    if (loading) {
        return (
            <div>
                <p>LOADING...</p>
            </div>
        )
    } else {
        return (
            <div id="setup_page">
                <div className="form_container" id="setup_form">
                    <h2>Quiz Setup Options</h2>

                    <div className="form_group" id="option_category">
                        <h3>Select Category:</h3>
                        <select value={category} onChange={handleCategoryChange}>
                            <option>All</option>
                            {options && options.map((opt) => (
                                <option value={opt.id} key={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form_group" id="option_difficulty">
                        <h3>Select Difficulty:</h3>
                        <select value={difficulty} onChange={handleDifficultyChange}>
                            <option value="" key="difficulty-0">All</option>
                            <option value="easy" key="difficulty-1">Easy</option>
                            <option value="medium" key="difficulty-2">Medium</option>
                            <option value="hard" key="difficulty-3">Hard</option>
                        </select>
                    </div>

                    <div className="form_group" id="option_type">
                        <h3>Select Question Type:</h3>
                        <select value={qtype} onChange={handleTypeChange}>
                            <option value="" key="type-0">All</option>
                            <option value="multiple" key="type-1">Multiple Choice</option>
                            <option value="boolean" key="type-2">True/False</option>
                        </select>
                    </div>

                    <div className="form_group" id="option_number">
                        <h3>Select Number of Questions:</h3>
                        <select value={number} onChange={handleNumberChange}>
                            <option value="5" key="5">5</option>
                            <option value="10" key="10">10</option>
                            <option value="15" key="15">15</option>
                            <option value="20" key="20">20</option>
                        </select>
                    </div>

                    <GetQuestions text="Start Quiz!"/>
                </div>
            </div>
        )
    }
}

export default Setup;