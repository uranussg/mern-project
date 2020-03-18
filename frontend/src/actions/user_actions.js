import * as APIUtil from '../util/user_api_util';
import jwt_decode from 'jwt-decode';


export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_ERRORS ='RECEIVE_ERRORS'



export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});



export const fetchUsers = users => dispatch => {
    
    APIUtil.getUsers(users).then((users) => {
        
        dispatch(receiveUsers(users))
    }
        , err => (
            dispatch(receiveErrors(err.response.data)
            ))
            );
        }