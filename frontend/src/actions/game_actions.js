
import { getDistribution } from '../util/game_api_util';

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

