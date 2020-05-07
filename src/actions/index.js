// keys for actiontypes

import axios from 'axios';

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=s_datta';

export const ActionTypes = {
    FETCH_POSTS: 'FETCH_POSTS',
    CREATE_POST: 'CREATE_POST',
    UPDATE_POST: 'UPDATE_POST',
    FETCH_POST: 'FETCH_POST',
    DELETE_POST: 'DELETE_POST',
    SELECT_POST: 'SELECT_POST',
    ERROR_SET: 'ERROR_SET',
};


export function fetchPosts() {
    // ActionCreator returns a function
    // that gets called with dispatch
    // remember (arg) => { } is a function
    console.log('in fetchposts');
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts${API_KEY}`)
            .then((response) => {
                // once we are done fetching we can dispatch a redux action with the response data
                console.log('fetch post response');
                console.log(response);
                dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
            })
            .catch((error) => {
                // whaaat?
                // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                // have an error component somewhere show it
                dispatch({ type: ActionTypes.ERROR_SET, error });
                // might you also want an ERROR_CLEAR action?
            });
    };
}

export function createPost(post, history) {
    /* axios post */
    return (dispatch) => {
        axios.post(`${ROOT_URL}/posts/${API_KEY}`, post)
            .then((response) => {
                dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
                history.push('/');
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.ERROR_SET, error });
            });
    };
}

export function updatePost(post) {
    /* axios put */
    return (dispatch) => {
        axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post)
            .then((response) => {
                dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.ERROR_SET, error });
            });
    };
}

export function fetchPost(id) {
    console.log('in fetch post');
    /* axios get */
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
            .then((response) => {
                console.log('fetch post response');
                console.log(response.data);
                dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
            })
            .catch((error) => console.log(error));
    };
}

export function deletePost(id, history) {
    /* axios delete */
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
            .then((response) => {
                dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
            })
            .catch(

            );
    };
}