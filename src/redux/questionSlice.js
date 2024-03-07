import { createSlice } from '@reduxjs/toolkit';
import { shuffleArray } from '../helpers/methodHelpers';

export const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: []
    },
    reducers: {
        setQuestions: (state, action) => {
            let questions = action.payload.map(question => ({
                ...question,
                answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
            }));
            state.questions = questions;
        }
    }
});

export const {setQuestions} = questionSlice.actions;

export default questionSlice.reducer;