

import { RECEIVE_USERS,  RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
  

  
export default function(state = {}, action) {
  const newState = {}
  switch (action.type) {
    case RECEIVE_USERS:
        action.users.data.forEach(user => {
            newState[user._id] = user
        });
      return newState;
    case RECEIVE_USER:
      const user = action.user[0]? action.user[0] : action.user
      return Object.assign({}, state, {[user._id] : user})
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.currentUser.id] : action.currentUser})
    default:
      return state;
  }
}
  