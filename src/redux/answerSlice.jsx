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
            let type = action.payload.type;

            let answer = {};
            let notSelecteddAns = state.answers.filter((item) => {
                if (item.question === question) {
                    answer = {...item}
                    return false;
                }
                return true;
            });
            if (Object.keys(answer).length === 0) {
                answer = {question: question, selectedAns: []};
            }
            if (type === 'multiple') {
                answer.selectedAns.push(ans);
            } else {
                answer.selectedAns = [ans];
            }
            notSelecteddAns.push(answer)
            state.answers = notSelecteddAns;
        },
        removeSelectedAnswer: (state, action) => {
            let question = action.payload.question;
            let ans = action.payload.ans;
            let type = action.payload.type;

            state.answers = state.answers.map((item) => {
                if (item.question === question) {
                    item.selectedAns = item.selectedAns.filter((s) => {
                        if (s != ans) {
                            return true;
                        }
                        return false;
                    });
                }
                return item;
            });
        }
    },
    
});

export const {setSelectedAnswer, removeSelectedAnswer} = answerSlice.actions;

export default answerSlice.reducer;