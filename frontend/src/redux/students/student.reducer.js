import * as studentActions from './student.actions';

export const studentFeatureKey = 'student-info';

let initialState = {
    loading: false,
    profiles: [],
    selectedProfile: {},
    errorMessage: ''
};

export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        // fetch all students
        case studentActions.FETCH_ALL_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case studentActions.FETCH_ALL_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                profiles: payload.profiles
            };
        case studentActions.FETCH_ALL_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Fetch a student
        case studentActions.FETCH_STUDENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case studentActions.FETCH_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProfile: payload.profile
            };
        case studentActions.FETCH_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        default: return state;
    }
};
