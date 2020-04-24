import { 
    SIGN_IN, 
    SIGN_OUT }
    from '../actions/actionTypes'

const initialState = {
    isSignedIn: false,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: {
            return {
                ...state,
                userId: action.payload,
                isSignedIn: true
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                userId: null,
                isSignedIn: false
            }
        }
        default: return state;
    }
    
}

export default authReducer;
