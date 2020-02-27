import axios from 'axios';
import {
    GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE
} from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then((profile) => {
            dispatch({
                type: GET_PROFILE,
                payload: profile.data || {}
            });
        })
        .catch((error) => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// set profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
}

// clear current profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
}

