import { useEffect, useState } from "react";

import {setSelectedAnswer, removeSelectedAnswer} from "../redux/answerSlice";
import { useDispatch, useSelector } from "react-redux";

const Question = ({question, displayResult}) => {

    const dispatch = useDispatch();

    const [allAnswerOpts, setAllAnswerOpts] = useState(question.incorrect_answers);
    useEffect(() => {
        if (typeof question.correct_answer === 'object') {
            setAllAnswerOpts([...allAnswerOpts, ...question.correct_answer]);
        } else {
            setAllAnswerOpts([question.correct_answer, ...allAnswerOpts ]);
        }
    }, []);

    const handleClickAns = (ans) => {
        let type = question.type;
        let questionTitle = question.question;
        let payload = {
            type,
            ans,
            question: questionTitle
        }
        // if selected answer option, remove it
        if (ans !== selectedAns) {
            dispatch(setSelectedAnswer(payload));
        } else {
            dispatch(removeSelectedAnswer(payload));
        }
    }

    const selectedAns = useSelector((state) => {
        let questionSelectedAns = state.answers.answers.find((item) => {
            if (item.question === question.question) {
                return true
            }
            return false;
        });
        return questionSelectedAns && questionSelectedAns.selectedAns;
    }) || null;

    const getAnsClassName = (ans) => {
        let classname = 'btn btn-outline-success font13 mgr-10';
        if ( (displayResult && question.correct_answer === ans )
            ||
            (!displayResult && ans === selectedAns )
        ) {
            classname += ' bg-green';
        } else if (displayResult && ans !== question.correct_answer && ans === selectedAns) {
            classname += ' bg-red';
        }
        return classname;
    }

    return (
        <>
            <div className="question">
                <p className="question-title">{question.question}</p>
                <div className="ans-block">
                    {
                        allAnswerOpts.map((ans, ind) => {
                            
                            return (
                                <>
                                    <button  key={ind} className={getAnsClassName(ans)} onClick={() => {
                                        handleClickAns(ans);
                                    }}>{ans}</button>
                                </>
                            );
                        })
                    }
                </div>
            </div>
            
        </>
    )
}
export default Question