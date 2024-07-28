import Axios from 'axios';

import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authToken';

import * as alertActions from '../alert/alert.actions';


export const GET_ALL_POSTS_REQUEST = 'GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE = 'GET_ALL_POSTS_FAILURE';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';



export const GET_POST_USER_REQUEST = 'GET_POST_USER_REQUEST';
export const GET_POST_USER_SUCCESS = 'GET_POST_USER_SUCCESS';
export const GET_POST_USER_FAILURE = 'GET_POST_USER_FAILURE';



export const GET_POST_GROUP_REQUEST = 'GET_POST_GROUP_REQUEST';
export const GET_POST_GROUP_SUCCESS = 'GET_POST_GROUP_SUCCESS';
export const GET_POST_GROUP_FAILURE = 'GET_POST_GROUP_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';




export const getAllPosts = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_ALL_POSTS_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_ALL_POSTS_FAILURE, payload: { error: error } });
        }
    };
};

export const createPost = (post) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: CREATE_POST_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/new`;
                let response = await Axios.post(dataUrl, post);
                dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: CREATE_POST_FAILURE, payload: { error: error } });
        }
    };
};



export const getPost = (postId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_POST_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/${postId}`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_POST_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_POST_FAILURE, payload: { error: error } });
        }
    };
};



export const getPostsbyUser = (userId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_POST_USER_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/user/${userId}`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_POST_USER_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_POST_USER_FAILURE, payload: { error: error } });
        }
    };
};



export const getPostsbyGroup = (studyGroupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_POST_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/studyGroup/${studyGroupId}`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_POST_GROUP_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_POST_USER_FAILURE, payload: { error: error } });
        }
    };
};


export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_POST_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/delete/${postId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Post is Deleted', 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: DELETE_POST_FAILURE, payload: { error: error } });
        }
    };
};

export const likePost = (postId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: LIKE_POST_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/like/${postId}`;
                let response = await Axios.put(dataUrl, postId);
                dispatch({ type: LIKE_POST_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: LIKE_POST_FAILURE, payload: { error: error } });
        }
    };
};

export const unlikePost = (postId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: UNLIKE_POST_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/unlike/${postId}`;
                let response = await Axios.put(dataUrl, postId);
                dispatch({ type: UNLIKE_POST_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: UNLIKE_POST_FAILURE, payload: { error: error } });
        }
    };
};

export const createComment = (comment, postId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: CREATE_COMMENT_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/comment/${postId}`;
                let response = await Axios.put(dataUrl, comment);
                dispatch({ type: CREATE_COMMENT_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: CREATE_COMMENT_FAILURE, payload: { error: error } });
        }
    };
};

export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_COMMENT_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/posts/comment/${postId}/${commentId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_COMMENT_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: DELETE_COMMENT_FAILURE, payload: { error: error } });
        }
    };
};
