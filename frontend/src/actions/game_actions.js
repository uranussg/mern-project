
import { getDistribution, getRoles } from '../util/game_api_util';

export const RECEIVE_ROLES = "RECEIVE_ROLES"


export const receiveRoles = roles=> ({
  type: RECEIVE_ROLES,
  roles
});





export const fetchDistribution = (room_id) =>dispatch=> {
  
  return getDistribution(room_id)
    .then(roles => {
      
      dispatch(receiveRoles(roles))})
    .catch(err => console.log(err))
}

export const startRoleDistribution = (theme_id, roomData) => dispatch => {
  return getRoles(theme_id, roomData)
  .then(roles => {
      
    dispatch(receiveRoles(roles))}, err => console.log(err))   
}
