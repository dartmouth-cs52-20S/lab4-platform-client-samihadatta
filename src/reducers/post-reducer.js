import { ActionTypes } from '../actions';

const initialState = {
    all: [],
    current: {},
    error: '',
};

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.FETCH_POSTS:
        return { ...state, all: action.payload }; // Alexis helped me with this line. in my state: assign all to action.payload; where data is
    case ActionTypes.UPDATE_POST:
        return { ...state, current: action.payload };
    case ActionTypes.FETCH_POST:
        return { ...state, current: action.payload };
    // case ActionTypes.ERROR_SET:
    //     return { ...state, error: action.payload };
    // case ActionTypes.ERROR_CLEAR:
    //     return { ...state, error: '' };
    default:
        return state;
    }
};

export default PostReducer;
