import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        answers: []
    },
    reducers: {
        setSelectedAnswer: (state, action) => {
            let question = action.payload.question;
            let ans = action.payload.ans;

            let answer = {};
            state.answers = state.answers.map((item) => {
                if (item.question === question) {
                    answer = item;
                    item.selectedAns = ans;
                    return item;
                }
                return item;
            });
            //
            if (Object.keys(answer).length === 0) {
                answer.question = question;
                answer.selectedAns = ans;
                state.answers.push(answer);
            }
        },
        removeSelectedAnswer: (state, action) => {
            let question = action.payload.question;

            state.answers = state.answers.filter((item) => {
                if (item.question === question) {
                    return false;
                }
                return true;
            });
        }
    },
    
});

export const {setSelectedAnswer, removeSelectedAnswer} = answerSlice.actions;

export default answerSlice.reducer;