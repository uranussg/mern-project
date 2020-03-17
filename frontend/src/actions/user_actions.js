import * as APIUtil from '../util/user_api_util';
import jwt_decode from 'jwt-decode';


export const RECEIVE_USERS = "RECEIVE_CURRENT_USER";


export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});


export const fetchUsers = user => dispatch => (
    APIUtil.getUsers(user).then((users) => (
        dispatch(receiveUsers(users))
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);