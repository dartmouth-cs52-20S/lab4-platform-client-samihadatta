import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/app';
import { ActionTypes } from './actions';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const token = localStorage.getItem('token'); // want it as high in the hierarchy as possible!
const username = localStorage.getItem('username');
if (token && username) {
    // type: 'AUTH_USER'
    store.dispatch({ type: ActionTypes.AUTH_USER, payload: username });
    console.log(username);
}

// we now wrap App in a Provider
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main'),
);
