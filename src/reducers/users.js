import { RECEIVE_USERS } from '../actions/users';
import { SAVE_QUESTION } from '../actions/questions';
import { SAVE_ANSWER } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat(action.question.id)
                }
            }
        case SAVE_ANSWER:
            return{
                ...state,
                [action.answer.authedUser] : {
                    ...state[action.answer.authedUser],
                    answers : {
                        ...state[action.answer.authedUser].answers,
                        [action.answer.qid] : action.answer.answer 
                    }
                }   
            }
        default:
        return state;
    }
}