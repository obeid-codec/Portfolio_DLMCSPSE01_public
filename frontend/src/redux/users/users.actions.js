import Axios from 'axios';
import * as alertActions from '../alert/alert.actions';

import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authToken';

import * as profileActions from '../profiles/profile.actions';


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';


export const EDIT_USER_INFO_REQUEST = 'EDIT_USER_INFO_REQUEST';
export const EDIT_USER_INFO_SUCCESS = 'EDIT_USER_INFO_SUCCESS';
export const EDIT_USER_INFO_FAILURE = 'EDIT_USER_INFO_FAILURE';


export const TOGGLE_ADMIN_REQUEST = 'TOGGLE_ADMIN_REQUEST';
export const TOGGLE_ADMIN_SUCCESS = 'TOGGLE_ADMIN_SUCCESS';
export const TOGGLE_ADMIN_FAILURE = 'TOGGLE_ADMIN_FAILURE';


export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';


export const registerUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: REGISTER_USER_REQUEST });
            let url = `${process.env.REACT_APP_API_URL}/users/register`;
            let response = await Axios.post(url, user);

            dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert('Registration is Success', 'success'));
            navigate('/users/login');
        } catch (error) {
            dispatch({ type: REGISTER_USER_FAILURE, payload: { error: error } });
            console.log(error);
            dispatch(alertActions.setAlert(error.response.data.msg, 'danger'));

        }
    }
}

export const loginUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_USER_REQUEST });
            let url = `${process.env.REACT_APP_API_URL}/users/login`;
            let response = await Axios.post(url, user);

            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert('Login is Success', 'success'));
            navigate('/');
            window.location.reload();
        } catch (error) {
            dispatch({ type: LOGIN_USER_FAILURE, payload: { error: error } });
            dispatch(alertActions.setAlert('Login is Failed', 'danger'));
        }
    }
}


export const getUserInfo = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: GET_USER_INFO_REQUEST });
            let url = `${process.env.REACT_APP_API_URL}/users/me`;
            let response = await Axios.get(url);
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_USER_INFO_FAILURE, payload: { error: error } });
            dispatch(alertActions.setAlert('Get User Info is Failed', 'danger'));
        }
    }
}


export const editUserInfoRequest = (user, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }

            dispatch({ type: EDIT_USER_INFO_REQUEST });
            let url = `${process.env.REACT_APP_API_URL}/users/me`;
            let response = await Axios.put(url, user);
            dispatch({ type: EDIT_USER_INFO_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert('Edit User Info is Success', 'success'));
            navigate('/profiles/dashboard');
        }
        catch (error) {
            dispatch({ type: EDIT_USER_INFO_FAILURE, payload: { error: error } });
            dispatch(alertActions.setAlert('Edit User Info is Failed', 'danger'));


        }
    }
}

export const toggleAdmin = (userId, isAdmin, callback) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: TOGGLE_ADMIN_REQUEST });
            let url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
            let response = await Axios.put(url, { isAdmin });
            dispatch({ type: TOGGLE_ADMIN_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(`User ${isAdmin ? 'granted' : 'revoked'} admin rights`, 'success'));
            if (callback) callback(); // Call the callback function

        } catch (error) {
            dispatch({ type: TOGGLE_ADMIN_FAILURE, payload: { error: error } });
            dispatch(alertActions.setAlert('Failed to update admin status', 'danger'));
        }
    }
}

export const logoutUser = (navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGOUT_USER });
            dispatch(profileActions.clearProfile());
            navigate('/');
        }
        catch (error) {
            console.error(error);
            dispatch({ type: LOGIN_USER_FAILURE });
        }
    };
};
