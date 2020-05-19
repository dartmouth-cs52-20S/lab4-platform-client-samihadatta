import { ActionTypes } from '../actions';

const initialState = {
    currentComments: [],
};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.FETCH_COMMENTS:
        return { ...state, currentComments: action.payload }; // Alexis helped me with this line. in my state: assign all to action.payload; where data i
        // return { ...state, currentComments: state.currentComments.push(action.payload) };
    default:
        return state;
    }
};

export default CommentReducer;
