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

    const gotoQuizPage = () => {
        navigate('/');
    }

    return (
        <div className="quiz container">

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
                <div className="col-100">
                    <button className="btn btn-secondary btn-lg" onClick={gotoQuizPage}>Create a new quiz</button>
                </div>
            </div>

        
        </div>
    );
}

export default Result;