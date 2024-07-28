import Axios from 'axios';
import * as alertActions from '../alert/alert.actions';

import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authToken';


export const GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST';
export const GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAILURE = 'GET_GROUPS_FAILURE';


export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_FAILURE = 'GET_GROUP_FAILURE';



export const GET_SPECIFIC_GROUP_REQUEST = 'GET_SPECIFIC_GROUP_REQUEST';
export const GET_SPECIFIC_GROUP_SUCCESS = 'GET_SPECIFIC_GROUP_SUCCESS';
export const GET_SPECIFIC_GROUP_FAILURE = 'GET_SPECIFIC_GROUP_FAILURE';




export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';


export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';


export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE';


export const JOIN_GROUP_REQUEST = 'JOIN_GROUP_REQUEST';
export const JOIN_GROUP_SUCCESS = 'JOIN_GROUP_SUCCESS';
export const JOIN_GROUP_FAILURE = 'JOIN_GROUP_FAILURE';


export const LEAVE_GROUP_REQUEST = 'LEAVE_GROUP_REQUEST';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';
export const LEAVE_GROUP_FAILURE = 'LEAVE_GROUP_FAILURE';




export const getGroups = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_GROUPS_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_GROUPS_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_GROUPS_FAILURE, payload: { error: error } });
        }
    };
};




export const getGroup = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/joined`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_GROUP_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_GROUP_FAILURE, payload: { error: error } });
        }
    };
};



export const getSpecificGroup = (groupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_SPECIFIC_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/${groupId}`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_SPECIFIC_GROUP_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_SPECIFIC_GROUP_FAILURE, payload: { error: error } });
        }
    };
};




export const createGroup = (group, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: CREATE_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/create-study-group`;
                let response = await Axios.post(dataUrl, group);
                dispatch({ type: CREATE_GROUP_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Group is Created', 'success'));
                navigate('/groups');
            }
        }
        catch (error) {
            dispatch({ type: CREATE_GROUP_FAILURE, payload: { error: error } });
        }
    };
};



export const deleteGroup = (groupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/delete-study-group/${groupId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_GROUP_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Group is Deleted', 'success'));

            }
        }
        catch (error) {
            console.error(error);
            dispatch({ type: DELETE_GROUP_FAILURE, payload: { error: error } });
        }
    };
};



export const updateGroup = (groupId, group, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: UPDATE_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/update-study-group/${groupId}`;
                let response = await Axios.put(dataUrl, group);
                dispatch({ type: UPDATE_GROUP_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('group is Updated', 'success'));
                navigate('/groups');
            }
        }
        catch (error) {
            dispatch({ type: UPDATE_GROUP_FAILURE, payload: { error: error } });
        }
    };
};




export const joinGroup = (groupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: JOIN_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/join-study-group/${groupId}`;
                let response = await Axios.post(dataUrl, groupId);
                dispatch({ type: JOIN_GROUP_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('group Joined', 'success'));
            }
        }
        catch (error) {
            dispatch({ type: JOIN_GROUP_FAILURE, payload: { error: error } });
        }
    };
};



export const leaveGroup = (groupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: LEAVE_GROUP_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/studygroups/leave-study-group/${groupId}`;
                let response = await Axios.post(dataUrl, groupId);
                dispatch({ type: LEAVE_GROUP_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('group leaved', 'success'));
            }
        }
        catch (error) {
            dispatch({ type: LEAVE_GROUP_FAILURE, payload: { error: error } });
        }
    };
};

