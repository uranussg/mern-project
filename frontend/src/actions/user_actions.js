import * as APIUtil from '../util/user_api_util';
import jwt_decode from 'jwt-decode';


export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS ='RECEIVE_ERRORS'



export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveUser = user => {
    // debugger
    return {
        type: RECEIVE_USER,
        user: user.data
    }
};

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const fetchUsers = user => dispatch => (
    APIUtil.getUsers(user).then((users) => (
        dispatch(receiveUsers(users))
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const fetchUser = userId => dispatch => {
    // debugger

    return(
    APIUtil.getUser(userId).then((user) => {
        // debugger
    
        dispatch(receiveUser(user))
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
    )
};

export const updateUser = user => dispatch => {
    // debugger
    return APIUtil.updateUser(user)
    .then(updatedUser => {
        // debugger
        dispatch(receiveUser(updatedUser))})
}