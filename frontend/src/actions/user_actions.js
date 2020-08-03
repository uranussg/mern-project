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
    
    return {
        type: RECEIVE_USER,
        user: user.data
    }
};

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});

export const fetchUsers = userData => dispatch => {
    // console.log(`action${userData.user_ids}`)
    APIUtil.getUsers(userData).then((users) => {
        
        dispatch(receiveUsers(users)
    )}, err => (
        dispatch(receiveErrors(err.response.data))
    ))
    };

export const fetchUser = userId => dispatch => {
    // 

    return(
    APIUtil.getUser(userId).then((user) => {
        // 
    
        dispatch(receiveUser(user))
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
    )
};

export const updateUser = user => dispatch => {
    // 
    return APIUtil.updateUser(user)
    .then(updatedUser => {
        // 
        dispatch(receiveUser(updatedUser))})
}