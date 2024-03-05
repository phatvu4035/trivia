import { configureStore } from '@reduxjs/toolkit';
import questionSlice from './questionSlice';
import answerSlice from './answerSlice';

export default configureStore({
  reducer: {
    questions: questionSlice,
    answers: answerSlice,
  },
})