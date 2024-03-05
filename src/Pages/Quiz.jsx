import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Filter from "../Components/Filter";
import Question from "../Components/Question";

const Quiz = () => {
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
        <div className="quiz container">
            <div className="filter">
                <Filter key={'filter'}/>
            </div>

            <div className="questions-block mglr--15">
                {
                    questions.map((question, ind) => {
                        return (
                            <>
                                <Question key={ind} question={question} displayResult={false} questionInd={ind}/>
                            </>
                        );
                    })
                }
                <div className="col-100">
                    {
                        questions.length === answers.length && 
                        <button className="btn btn-secondary btn-lg" onClick={gotoResultPage}>Submit</button>
                    }
                </div>
            </div>

        
        </div>
    );
}

export default Quiz;