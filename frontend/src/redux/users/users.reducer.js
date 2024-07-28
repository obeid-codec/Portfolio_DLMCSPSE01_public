import * as userActions from './users.actions';
export const usersFeatureKey = 'users-into';

export const initialState = {
    loading: false,
    token: '',
    user: {},
    isAuthenticated: false,
    errorMessage: ''
}


export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        // Register User
        case userActions.REGISTER_USER_REQUEST:
            return { ...state, loading: true };
        case userActions.REGISTER_USER_SUCCESS:
            return { ...state, loading: false };
        case userActions.REGISTER_USER_FAILURE:
            return { ...state, loading: false, errorMessage: payload.error.message };
        // Login User
        case userActions.LOGIN_USER_REQUEST:
            return { ...state, loading: true };
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem('uniconnect-auth-token', payload.token);
            return { ...state, loading: false, token: payload.token, isAuthenticated: true };
        case userActions.LOGIN_USER_FAILURE:
            localStorage.removeItem('uniconnect-auth-token');
            return { ...state, loading: false, user: {}, token: '', isAuthenticated: false, errorMessage: payload.error.message };
        //get user info
        case userActions.GET_USER_INFO_REQUEST:
            return { ...state, loading: true };
        case userActions.GET_USER_INFO_SUCCESS:
            return { ...state, loading: false, user: payload.user, isAuthenticated: true };
        case userActions.GET_USER_INFO_FAILURE:
            return { ...state, loading: false, user: {}, isAuthenticated: false, errorMessage: payload.error.message };
        // Edit User Info
        case userActions.EDIT_USER_INFO_REQUEST:
            return { ...state, loading: true };
        case userActions.EDIT_USER_INFO_SUCCESS:
            return { ...state, loading: false, user: payload.user };
        case userActions.EDIT_USER_INFO_FAILURE:
            return { ...state, loading: false, errorMessage: payload.error.message };
        // Make admin
        case userActions.TOGGLE_ADMIN_REQUEST:
            return { ...state, loading: true };
        case userActions.TOGGLE_ADMIN_SUCCESS:
            return { ...state, loading: false, user: payload.user };
        case userActions.TOGGLE_ADMIN_FAILURE:
            return { ...state, loading: false, errorMessage: payload.error.message };
        // Logout User
        case userActions.LOGOUT_USER:
            localStorage.removeItem('uniconnect-auth-token');
            return { ...state, user: {}, token: '', isAuthenticated: false };
        case userActions.LOGOUT_USER_FAILURE:
            return { ...state };
        default:
            return state;
    }
}

