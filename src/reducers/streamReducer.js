import { 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELEATE_STREAM,
    EDIT_STREAM 
} from '../actions/actionTypes';
import _ from 'lodash';

const streamReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_STREAM:  return {...state, [action.payload.id]: action.payload };
        case FETCH_STREAMS:  
        const objState = {};
            const fetchedData = action.payload;
            for(let i = 0; i<fetchedData.length; i++){
                objState[fetchedData[i].id] = fetchedData[i] 
            }
        return objState;
        case FETCH_STREAM:   return {...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:    return {...state, [action.payload.id]: action.payload };
        case DELEATE_STREAM: return  _.omit(state, action.payload);
        default: return state;
    }
}

export default streamReducer;
