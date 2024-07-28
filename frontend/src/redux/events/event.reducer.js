import * as eventActions from './event.actions';

export const eventFeatureKey = 'events';

let initialState = {
    loading: false,
    events: [],
    SelectedEvent: {},
    errorMessage: ''
};



export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        //create a new event
        case eventActions.CREATE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventActions.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case eventActions.CREATE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        //get all events    
        case eventActions.GET_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventActions.GET_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: payload.events
            };
        case eventActions.GET_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        //get one event based id    
        case eventActions.GET_ONE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventActions.GET_ONE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                SelectedEvent: payload.event
            };
        case eventActions.GET_ONE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        //get event based groupId    
        case eventActions.GET_GROUP_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventActions.GET_GROUP_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: payload.events
            };
        case eventActions.GET_GROUP_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        //delete an event
        case eventActions.DELETE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventActions.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case eventActions.DELETE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        default: return state;
    }
};