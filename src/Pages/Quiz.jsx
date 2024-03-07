import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Filter from "../Components/Filter";
import Question from "../Components/Question";
import { setQuestions } from "../redux/questionSlice";
import { clearAllAnswer } from '../redux/answerSlice';

const Quiz = () => {
    const dispatch = useDispatch();
    // reset question and answer
    useEffect(() => {
        dispatch(setQuestions([]));
        dispatch(clearAllAnswer());
    }, [])

    const navigate = useNavigate();

    const questions = useSelector(state => {
        return state.questions.questions;
    });

    const answers = useSelector(state => {
        return state.answers.answers;
    });

    const gotoResultPage = () => {
        navigate('/result');
    }

    return (
        <div className="quiz">
            <div className="filter">
                <Filter/>
            </div>

            <div className="questions-block mglr--15">
                {
                    questions.map((question, ind) => {
                        return (
                            <React.Fragment key={ind}>
                                <Question key={ind} question={question} displayResult={false} questionInd={ind}/>
                            </React.Fragment>
                        );
                    })
                }
                <div className="col-100">
                    {
                        (questions.length > 0 && questions.length === answers.length ) && 
                        <button className="btn btn-secondary btn-lg" onClick={gotoResultPage}>Submit</button>
                    }
                </div>
            </div>

        
        </div>
    );
}

export default Quiz;