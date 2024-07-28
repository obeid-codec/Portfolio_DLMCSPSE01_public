import Axios from 'axios';


import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authToken';


import * as alertActions from '../alert/alert.actions';




export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';



export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';



export const GET_ONE_EVENT_REQUEST = 'GET_ONE_EVENT_REQUEST';
export const GET_ONE_EVENT_SUCCESS = 'GET_ONE_EVENT_SUCCESS';
export const GET_ONE_EVENT_FAILURE = 'GET_ONE_EVENT_FAILURE';


export const GET_GROUP_EVENT_REQUEST = 'GET_GROUP_EVENT_REQUEST';
export const GET_GROUP_EVENT_SUCCESS = 'GET_GROUP_EVENT_SUCCESS';
export const GET_GROUP_EVENT_FAILURE = 'GET_GROUP_EVENT_FAILURE';




export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';




export const createEvent = (event, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: CREATE_EVENT_REQUEST });
            let dataURL = `${process.env.REACT_APP_API_URL}/events/create`;
            let response = await Axios.post(dataURL, event);
            dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert('Event is Successfully created', 'success'));
            navigate('/events');

        }
        catch (error) {
            dispatch({ type: CREATE_EVENT_FAILURE, payload: error.response.data });
        }
    }
};





export const getAllEvents = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: GET_EVENTS_REQUEST });
            let dataURL = `${process.env.REACT_APP_API_URL}/events/all`;
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_EVENTS_FAILURE, payload: error.response.data });
        }
    }
};







export const getOneEvent = (eventId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: GET_ONE_EVENT_REQUEST });
            let dataURL = `${process.env.REACT_APP_API_URL}/events/${eventId}`;
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_ONE_EVENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_ONE_EVENT_FAILURE, payload: error.response.data });
        }
    }
};



export const getGroupEvent = (groupId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: GET_GROUP_EVENT_REQUEST });
            let dataURL = `${process.env.REACT_APP_API_URL}/events/group/${groupId}`;
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_GROUP_EVENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_GROUP_EVENT_FAILURE, payload: error.response.data });
        }
    }
};



export const deleteGroupEvent = (eventId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
            }
            dispatch({ type: DELETE_EVENT_REQUEST });
            let dataURL = `${process.env.REACT_APP_API_URL}/events/${eventId}`;
            let response = await Axios.delete(dataURL);
            dispatch({ type: DELETE_EVENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: DELETE_EVENT_FAILURE, payload: error.response.data });
        }
    }
};

