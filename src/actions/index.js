/* eslint-disable no-use-before-define */
// keys for actiontypes

import axios from 'axios';

const ROOT_URL = 'https://samihadatta-cs52-blog-v2.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=s_datta';

export const ActionTypes = {
    FETCH_POSTS: 'FETCH_POSTS',
    CREATE_POST: 'CREATE_POST',
    UPDATE_POST: 'UPDATE_POST',
    FETCH_POST: 'FETCH_POST',
    DELETE_POST: 'DELETE_POST',
    SELECT_POST: 'SELECT_POST',
    ERROR_SET: 'ERROR_SET',
    ERROR_CLEAR: 'ERROR_CLEAR',
    FETCH_COMMENTS: 'FETCH_COMMENTS',
    FETCH_COMMENT: 'FETCH_COMMENT',
    ADD_COMMENT: 'ADD_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    DELETE_COMMENTS: 'DELETE_COMMENTS',
};


// FUNCTIONS FOR POSTS

export function fetchPosts() {
    // ActionCreator returns a function
    // that gets called with dispatch
    // remember (arg) => { } is a function
    console.log('in fetchposts');
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts`)
            .then((response) => {
                // once we are done fetching we can dispatch a redux action with the response data
                console.log('response');
                console.log(response);
                dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
            })
            .catch((error) => {
                // whaaat?
                // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                // have an error component somewhere show it
                dispatch({ type: ActionTypes.ERROR_SET, error });
                // might you also want an ERROR_CLEAR action?
                console.log('error');
                console.log(error);
            });
    };
}

export function createPost(post, history) {
    /* axios post */
    // eslint-disable-next-line no-param-reassign
    // post.tags = post.tags.split(',');
    return (dispatch) => {
        axios.post(`${ROOT_URL}/posts`, post)
            .then((response) => {
                dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
                history.push('/');
                console.log('response');
                console.log(response);
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.ERROR_SET, error });
                console.log('error');
                console.log(error);
            });
    };
}

export function updatePost(post, callback) {
    /* axios put */
    // post.tags = post.tags.split(',');
    return (dispatch) => {
        axios.put(`${ROOT_URL}/posts/${post._id}`, post)
            .then((response) => {
                dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
                callback();
                console.log('response');
                console.log(response);
            })
            .catch((error) => {
                // dispatch({ type: ActionTypes.ERROR_SET, error });
                console.log('error');
                console.log(error);
            });
    };
}

export function fetchPost(id) {
    /* axios get */
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts/${id}`)
            .then((response) => {
                if (!('message' in response.data)) {
                    dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
                    dispatch({ type: ActionTypes.ERROR_CLEAR, payload: '' });
                } else {
                    // errorSet(response.data.message);
                    dispatch({ type: ActionTypes.ERROR_SET, payload: response.data.message });
                }
                // dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
                // console.log('response');
                // console.log(response);
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };
}

export function deletePost(id, history) {
    /* axios delete */
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/posts/${id}`)
            .then((response) => {
                dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
                console.log('response');
                console.log(response);
                axios.delete(`${ROOT_URL}/comments/post=${id}`)
                    .then((result) => {
                        // dispatch({ type: ActionTypes.DELETE_COMMENT, payload: response.data });
                        console.log('response');
                        console.log(result);
                        history.push('/');
                    })
                    .catch((error) => {
                        console.log('error');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };
}

export function errorClear() {
    console.log('in error clear');
    return (dispatch) => {
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: '' });
    };
}


// FUNCTIONS FOR COMMENTS

/*
FETCH_COMMENTS: 'FETCH_COMMENTS',
    FETCH_COMMENT: 'FETCH_COMMENT',
    ADD_COMMENT: 'ADD_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    DELETE_COMMENTS: 'DELETE_COMMENTS',
*/

export function fetchComments(postId) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/comments/post=${postId}`)
            .then((response) => {
                // once we are done fetching we can dispatch a redux action with the response data
                console.log('fetch comments response');
                console.log(response);
                dispatch({ type: ActionTypes.FETCH_COMMENTS, payload: response.data });
            })
            .catch((error) => {
                // whaaat?
                // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                // have an error component somewhere show it
                dispatch({ type: ActionTypes.ERROR_SET, error });
                // might you also want an ERROR_CLEAR action?
                console.log('error');
                console.log(error);
            });
    };
}

// export function fetchComment(commentId) {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/comments/comment=${commentId}`)
//             .then((response) => {
//                 if (!('message' in response.data)) {
//                     dispatch({ type: ActionTypes.FETCH_COMMENT, payload: response.data });
//                     dispatch({ type: ActionTypes.ERROR_CLEAR, payload: '' });
//                 } else {
//                     // errorSet(response.data.message);
//                     dispatch({ type: ActionTypes.ERROR_SET, payload: response.data.message });
//                 }
//                 // dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
//                 // console.log('response');
//                 // console.log(response);
//             })
//             .catch((error) => {
//                 console.log('error');
//                 console.log(error);
//             });
//     };
// }

export function addComment(postId, comment) {
    console.log('in actions addComment');
    console.log(comment);
    return (dispatch) => {
        axios.post(`${ROOT_URL}/comments/post=${postId}`, comment)
            .then((result) => {
                console.log('add comment response');
                console.log(result);
                // dispatch({ type: ActionTypes.FETCH_COMMETS, payload: response.data });
                // fetchComments(postId);
                axios.get(`${ROOT_URL}/comments/post=${postId}`)
                    .then((response) => {
                        // once we are done fetching we can dispatch a redux action with the response data
                        console.log('fetch comments response');
                        console.log(response);
                        dispatch({ type: ActionTypes.FETCH_COMMENTS, payload: response.data });
                    })
                    .catch((error) => {
                        // whaaat?
                        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                        // have an error component somewhere show it
                        dispatch({ type: ActionTypes.ERROR_SET, error });
                        // might you also want an ERROR_CLEAR action?
                        console.log('error');
                        console.log(error);
                    });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.ERROR_SET, error });
                console.log('error');
                console.log(error);
            });
    };
}

export function updateComment(commentId, comment, callback) {
    console.log('commentId');
    console.log(commentId);
    console.log('comment');
    console.log(comment);
    return (dispatch) => {
        axios.put(`${ROOT_URL}/comments/comment=${commentId}`, comment)
            .then((result) => {
                // dispatch({ type: ActionTypes.UPDATE_COMMENT, payload: response.data });
                callback();
                console.log('response');
                console.log(result);
                axios.get(`${ROOT_URL}/comments/post=${comment.postId}`)
                    .then((response) => {
                        // once we are done fetching we can dispatch a redux action with the response data
                        console.log('fetch comments response');
                        console.log(response);
                        dispatch({ type: ActionTypes.FETCH_COMMENTS, payload: response.data });
                    })
                    .catch((error) => {
                        // whaaat?
                        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                        // have an error component somewhere show it
                        dispatch({ type: ActionTypes.ERROR_SET, error });
                        // might you also want an ERROR_CLEAR action?
                        console.log('error');
                        console.log(error);
                    });
            })
            .catch((error) => {
                // dispatch({ type: ActionTypes.ERROR_SET, error });
                console.log('error');
                console.log(error);
            });
    };
}

export function deleteComment(commentId, comment) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/comments/comment=${commentId}`)
            .then((result) => {
                // dispatch({ type: ActionTypes.DELETE_COMMENT, payload: response.data });
                console.log('response');
                console.log(result);
                axios.get(`${ROOT_URL}/comments/post=${comment.postId}`)
                    .then((response) => {
                        // once we are done fetching we can dispatch a redux action with the response data
                        console.log('fetch comments response');
                        console.log(response);
                        dispatch({ type: ActionTypes.FETCH_COMMENTS, payload: response.data });
                    })
                    .catch((error) => {
                        // whaaat?
                        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
                        // have an error component somewhere show it
                        dispatch({ type: ActionTypes.ERROR_SET, error });
                        // might you also want an ERROR_CLEAR action?
                        console.log('error');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };
}

export function deleteComments(postId) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/comments/post=${postId}`)
            .then((response) => {
                dispatch({ type: ActionTypes.DELETE_COMMENT, payload: response.data });
                console.log('response');
                console.log(response);
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };
}
