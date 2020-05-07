import { ActionTypes } from '../actions';

const initialState = {
    all: [],
    current: {},
};

const PostReducer = (state = initialState, action) => {
    console.log('in fetch post in reducer -> action.payload');
    console.log(action.payload);
    console.log('state');
    console.log(state);
    switch (action.type) {
    case ActionTypes.FETCH_POSTS:
        return { ...state, all: action.payload }; // Alexis helped me with this line. in my state: assign all to action.payload; where data is
    case ActionTypes.CREATE_POST:
        return {};
    case ActionTypes.UPDATE_POST:
        return {};
    case ActionTypes.FETCH_POST:
        return { ...state, current: action.payload };
    case ActionTypes.DELETE_POST:
        return {};
    default:
        return state;
    }
};

export default PostReducer;
