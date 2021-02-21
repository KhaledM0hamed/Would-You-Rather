import { RECEIVE_QUESTIONS } from '../actions/questions';
import { SAVE_QUESTION } from '../actions/questions';
import { SAVE_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        
        case SAVE_QUESTION :   
            console.log(action)
            return {
                ...state,
                [action.question.id]: action.question
            }
        
        case SAVE_ANSWER:
            console.log(action)
            return{
                ...state,
                [action.answer.qid]: {
                    ...state[action.answer.qid],
                    [action.answer.answer]: {
                        ...state[action.answer.qid][action.answer.answer],
                        votes : state[action.answer.qid][action.answer.answer].votes.concat([action.answer.authedUser])
                    }
                }
            }
        default:
        return state;
    }
}