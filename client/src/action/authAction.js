import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const registerUser = (userData, history) => dispatch => {

    axios
        .post('/api/users/register/', userData)
        .then((user) => {
            console.log(user);
            history.push('/login');
        })
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        });

}


export const loginUser = (userData, history) => dispatch => {

    axios
        .post('/api/users/login/', userData)
        .then((res) => {
            // save to local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // set token to auth header;
            setAuthToken(token);
            // get user info
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response
            })
        });

}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    // remove token
    localStorage.removeItem('jwtToken');
    // remove authHeader for future request
    setAuthToken(false);
    // set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}