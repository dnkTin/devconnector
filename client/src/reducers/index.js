import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});