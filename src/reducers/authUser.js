import { SET_AUTH_USER, LOGOUT } from '../actions/authUser';

export default function authUser(state = null, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            return action.id
        case LOGOUT:
            return null 
        default:
            return state
    }
}