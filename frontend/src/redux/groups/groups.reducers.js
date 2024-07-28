import * as groupActions from './groups.actions'

export const groupFeatureKey = 'group-info';



let initialState = {
    loading: false,
    groups: [],
    selectedGroup: {},
    errorMessage: ''
}


export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        //GET all groups 

        case groupActions.GET_GROUPS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case groupActions.GET_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: payload.groups
            }
        case groupActions.GET_GROUPS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }
        //GET joined groups 

        case groupActions.GET_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.GET_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: payload.groups
            }
        case groupActions.GET_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }
        //GET a specific group 

        case groupActions.GET_SPECIFIC_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.GET_SPECIFIC_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedGroup: payload.group
            }
        case groupActions.GET_SPECIFIC_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }
        //Create a group
        case groupActions.CREATE_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: [...state.groups, payload.group]
            }
        case groupActions.CREATE_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }

        //delete a group
        case groupActions.DELETE_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: state.groups.filter(group => group._id !== payload.group._id)
            }
        case groupActions.DELETE_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }

        //update a group
        case groupActions.UPDATE_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                group: payload.group
            }
        case groupActions.UPDATE_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }

        //join a group
        case groupActions.JOIN_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.JOIN_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedGroup: payload.group

            }
        case groupActions.JOIN_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }

        //leave a group
        case groupActions.LEAVE_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupActions.LEAVE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case groupActions.LEAVE_GROUP_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            }
        default:
            return state;
    }
} 