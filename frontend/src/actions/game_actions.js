
// import { getDistribution, getRoles, deleteDistribution } from '../util/game_api_util';
import * as APIUtil from '../util/game_api_util';

export const RECEIVE_ROLES = "RECEIVE_ROLES"
export const DELETE_ROLES ='DELETE_ROLES'


export const receiveRoles = roles=> ({
  type: RECEIVE_ROLES,
  roles
});

export const deleteRoles = () => ({
  type: DELETE_ROLES
 })


export const fetchDistribution = (room_id) =>dispatch=> {
  
  return APIUtil.getDistribution(room_id)
    .then(roles => {
      
      dispatch(receiveRoles(roles))})
    .catch(err => console.log(err))
}

export const startRoleDistribution = (theme_id, roomData) => dispatch => {
  return APIUtil.getRoles(theme_id, roomData)
  .then(roles => {
      
    return dispatch(receiveRoles(roles))}, err => console.log(err))   
}

export const deleteRoleDistribution = (room_id) => dispatch => {
  
  return APIUtil.deleteDistribution(room_id)
    .then(() => {
      
      dispatch(deleteRoles())
    })
    .catch(err => console.log(err))
}



export const createTheme = (themeData) => dispatch => {
  return APIUtil.createTheme(themeData.theme)
  .then((theme)=> {
    themeData.roles.forEach(role => {
      APIUtil.createRole(theme._id, role)
    })
    .then(()=>dispatch(startRoleDistribution(theme._id, themeData.room)));
  })
}