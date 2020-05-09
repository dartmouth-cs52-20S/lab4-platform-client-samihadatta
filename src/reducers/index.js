// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostReducer from './post-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
    posts: PostReducer,
    errors: ErrorReducer,
});

export default rootReducer;
