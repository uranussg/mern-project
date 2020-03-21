import { RECEIVE_ROLES, DELETE_ROLES } from '../actions/game_actions';
import{ EXIT_ROOM } from '../actions/room_actions'
  
  const RolesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_ROLES:
        
        newState = action.roles.data.distribution;
        return newState;

      case EXIT_ROOM:
        newState = {}
        return newState
      case DELETE_ROLES:
          newState = {}
          return newState
      default:
        return state;
    }
  };
  
  export default RolesReducer;