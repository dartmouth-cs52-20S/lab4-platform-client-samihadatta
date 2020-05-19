import { ActionTypes } from '../actions';

const initialState = { authenticated: false, username: '' };

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.AUTH_USER:
        console.log('in auth reducer');
        console.log(action.payload);
        return { ...state, authenticated: true, username: action.payload };
    case ActionTypes.DEAUTH_USER:
        return { ...state, authenticated: false, username: '' };
    case ActionTypes.AUTH_ERROR:
        return { ...state, authenticated: false, error: action.payload };
    default:
        return state;
    }
};

export default AuthReducer;
