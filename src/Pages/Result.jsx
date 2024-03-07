import { useState } from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Question from "../Components/Question";

const Result = () => {
    const navigate = useNavigate();

    const questions = useSelector(state => {
        return state.questions.questions;
    });

    const answers = useSelector(state => {
        return state.answers.answers;
    });

    const countCorrectAnswer = () => {
        let count = 0;
        questions.forEach((ques) => {
            answers.forEach((item) => {
                if (item.question === ques.question && item.selectedAns === ques.correct_answer) {
                    count++;
                }
            });
        });
        return count;
    }

    const getColorOfScore = () => {
        if (correctCount < 2) {
            return 'bg-red';
        } else if (correctCount < 4) {
            return 'bg-yellow';
        } else {
            return 'bg-green';
        }
    }

    const [correctCount] = useState(() => {
        return countCorrectAnswer();
    });

    const gotoQuizPage = () => {
        navigate('/');
    }

    return (
        <div className="quiz">

            <div className="questions-block mglr--15">
                {
                    questions.map((question, ind) => {
                        return (
                            <>
                                <Question key={ind} question={question} displayResult={true} questionInd={ind}/>
                            </>
                        );
                    })
                }
                {
                    (answers.length > 0) &&
                    <div className='text-center wd300 mglr-auto'><p className={getColorOfScore()}>You scored {correctCount} of {questions.length}</p></div>
                }
                
                <div className="col-100">
                    <button className="btn btn-secondary btn-lg" onClick={gotoQuizPage}>Create a new quiz</button>
                </div>
            </div>

        
        </div>
    );
}

export default Result;