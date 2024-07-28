import Axios from 'axios';

export const FETCH_ALL_STUDENTS_REQUEST = 'FETCH_ALL_STUDENTS_REQUEST';
export const FETCH_ALL_STUDENTS_SUCCESS = 'FETCH_ALL_STUDENTS_SUCCESS';
export const FETCH_ALL_STUDENTS_FAILURE = 'FETCH_ALL_STUDENTS_FAILURE';

export const FETCH_STUDENT_REQUEST = 'FETCH_STUDENT_REQUEST';
export const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
export const FETCH_STUDENT_FAILURE = 'FETCH_STUDENT_FAILURE';

export const fetchAllStudents = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_ALL_STUDENTS_REQUEST });
            let dataUrl = `${process.env.REACT_APP_API_URL}/profile`;
            let response = await Axios.get(dataUrl);
            dispatch({ type: FETCH_ALL_STUDENTS_SUCCESS, payload: response.data });
        }
        catch (error) {
            console.error(error);
            dispatch({ type: FETCH_ALL_STUDENTS_FAILURE, payload: { error: error } })
        }
    };
};

export const fetchStudent = (studentId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_STUDENT_REQUEST });
            let dataUrl = `${process.env.REACT_APP_API_URL}/profile/user/${studentId}`;
            let response = await Axios.get(dataUrl);
            dispatch({ type: FETCH_STUDENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            console.error(error);
            dispatch({ type: FETCH_STUDENT_FAILURE, payload: { error: error } });
        }
    }
};
