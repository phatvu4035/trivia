import React, { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import { setQuestions } from "../redux/questionSlice";

import {shuffleArray} from "../helpers/methodHelpers";

const Filter = () => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [categories, setCategories] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    }

    useEffect(() => {
        let url = `https://opentdb.com/api_category.php`;
        fetch(url).then(resp => resp.json()).then(data => {
            setCategories(data.trivia_categories);
        } );
    }, []);

    const getQuizs = () => {
        setIsSubmitting(true);
        let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
        fetch(url).then(resp => resp.json()).then((data) => {
            dispatch(setQuestions(data.results.map(
                    question => ({
                    ...question,
                    answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
                })))
            );
            setIsSubmitting(false);
        });
        return false;
    }
    return (
        <form className="filter-form">
            <div className="row">
                <div className="form-group col-45">
                    <select className="form-control" name="categorySelect" onChange={handleCategoryChange} defaultValue={category}>
                        <option value={''}>Select a category</option>
                        {categories.map((cat) => {
                            return (
                                <React.Fragment key={cat.id}>
                                    <option value={cat.id}>{cat.name}</option>
                                </ React.Fragment>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group col-45">
                    <select className="form-control" name="difficultySelect" onChange={handleDifficultyChange} defaultValue={difficulty}>
                        <option key={'1'} value={''}>Select a difficulty</option>
                        <option key={'2'} value="easy">Easy</option>
                        <option key={'3'} value="medium">Medium</option>
                        <option key={'4'} value="hard">Hard</option>
                    </select>
                </div>
                <div className="col-10">
                    <button id="createBtn" onClick={(event) => {
                        getQuizs();
                        event.preventDefault();
                    }} className="btn btn-outline-dark" disabled={isSubmitting}>Create</button>
                </div>
            </div>
        </form>
    );
}
export default Filter
