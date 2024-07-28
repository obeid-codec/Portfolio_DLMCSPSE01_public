import { combineReducers } from "redux";
import * as alertReducer from "./alert/alert.reducer";
import * as usersReducer from "./users/users.reducer";
import * as profileReducer from "./profiles/profile.reducer";
import * as studentReducer from "./students/student.reducer";
import * as postReducer from "./posts/post.reducer";
import * as groupReducer from './groups/groups.reducers'
import * as eventReducer from './events/event.reducer'

// Combine all reducers into one root reducer
export const rootReducer = combineReducers({
    [alertReducer.alertFeatureKey]: alertReducer.reducer,
    [usersReducer.usersFeatureKey]: usersReducer.reducer,
    [profileReducer.profileFeatureKey]: profileReducer.reducer,
    [studentReducer.studentFeatureKey]: studentReducer.reducer,
    [postReducer.postFeatureKey]: postReducer.reducer,
    [groupReducer.groupFeatureKey]: groupReducer.reducer,
    [eventReducer.eventFeatureKey]: eventReducer.reducer

});