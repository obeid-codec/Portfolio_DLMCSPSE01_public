import Axios from 'axios';

import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authToken';
import * as alertActions from '../alert/alert.actions';


export const CLEAR_PROFILE = 'CLEAR_PROFILE';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const CREATE_PROFILE_REQUEST = 'CREATE_PROFILE_REQUEST';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE';

export const DELETE_EXPERIENCE_REQUEST = 'DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCE_SUCCESS = 'DELETE_EXPERIENCE_SUCCESS';
export const DELETE_EXPERIENCE_FAILURE = 'DELETE_EXPERIENCE_FAILURE';

export const DELETE_EDUCATION_REQUEST = 'DELETE_EDUCATION_REQUEST';
export const DELETE_EDUCATION_SUCCESS = 'DELETE_EDUCATION_SUCCESS';
export const DELETE_EDUCATION_FAILURE = 'DELETE_EDUCATION_FAILURE';

export const DELETE_COURSE_REQUEST = 'DELETE_COURSE_REQUEST';
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
export const DELETE_COURSE_FAILURE = 'DELETE_COURSE_FAILURE';


export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';

export const ADD_EDUCATION_REQUEST = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE = 'ADD_EDUCATION_FAILURE';


export const ADD_COURSE_REQUEST = 'ADD_COURSE_REQUEST';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
export const ADD_COURSE_FAILURE = 'ADD_COURSE_FAILURE';




export const clearProfile = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: CLEAR_PROFILE });
        }
        catch (error) {
            console.error(error);
        }
    };
};


export const getProfile = () => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: GET_PROFILE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/me`;
                let response = await Axios.get(dataUrl);
                dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            dispatch({ type: GET_PROFILE_FAILURE, payload: { error: error } });
        }
    };
};

export const deleteExperience = (experienceId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_EXPERIENCE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/experience/${experienceId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Experience is Deleted', 'success'));
            }
        }
        catch (error) {
            dispatch({ type: DELETE_EXPERIENCE_FAILURE, payload: { error: error } });
        }
    };
};

export const deleteEducation = (educationId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_EDUCATION_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/education/${educationId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Education is Deleted', 'success'));
            }
        }
        catch (error) {
            dispatch({ type: DELETE_EDUCATION_FAILURE, payload: { error: error } });
        }
    };
};


export const deleteCourse = (CourseId) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: DELETE_COURSE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/course/${CourseId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({ type: DELETE_COURSE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Course is Deleted', 'success'));
            }
        }
        catch (error) {
            dispatch({ type: DELETE_COURSE_FAILURE, payload: { error: error } });
        }
    };
};

export const updateProfile = (profile, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: UPDATE_PROFILE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/update`;
                let response = await Axios.put(dataUrl, profile);
                dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Profile is Updated', 'success'));
                navigate('/profiles/dashboard');
            }
        }
        catch (error) {
            dispatch({ type: UPDATE_PROFILE_FAILURE, payload: { error: error } });
        }
    };
};

export const createProfile = (profile, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: CREATE_PROFILE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/create`;
                let response = await Axios.post(dataUrl, profile);
                dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Profile is Created', 'success'));
                navigate('/profiles/dashboard');
            }
        }
        catch (error) {
            dispatch({ type: CREATE_PROFILE_FAILURE, payload: { error: error } });
        }
    };
};

export const addExperience = (experience, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: ADD_EXPERIENCE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/experience/`;
                let response = await Axios.put(dataUrl, experience);
                dispatch({ type: ADD_EXPERIENCE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Experience is Added', 'success'));
                navigate('/profiles/dashboard');
            }
        }
        catch (error) {
            dispatch({ type: ADD_EXPERIENCE_FAILURE, payload: { error: error } });
        }
    };
};

export const addEducation = (education, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: ADD_EDUCATION_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/education/`;
                let response = await Axios.put(dataUrl, education);
                dispatch({ type: ADD_EDUCATION_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Education is Added', 'success'));
                navigate('/profiles/dashboard');
            }
        }
        catch (error) {
            dispatch({ type: ADD_EDUCATION_FAILURE, payload: { error: error } });
        }
    };
};



export const addCourse = (course, navigate) => {
    return async (dispatch) => {
        try {
            if (userUtil.isLoggedIn()) {
                let token = userUtil.getTokens();
                authUtil.setAuthToken(token);
                dispatch({ type: ADD_COURSE_REQUEST });
                let dataUrl = `${process.env.REACT_APP_API_URL}/profile/course/`;
                let response = await Axios.put(dataUrl, course);
                dispatch({ type: ADD_COURSE_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert('Course is Added', 'success'));
                navigate('/profiles/dashboard');
            }
        }
        catch (error) {
            dispatch({ type: ADD_COURSE_FAILURE, payload: { error: error } });
        }
    };
};
