

import { RECEIVE_USERS,  RECEIVE_USER } from "../actions/user_actions";
  

  
  export default function(state = {}, action) {
    const newState = {}
    switch (action.type) {
    case RECEIVE_USERS:
      debugger
        action.users.data.forEach(user => {
            newState[user._id] = user
        });
    return newState;
    case RECEIVE_USER:
      // debugger
        return Object.assign({}, state, {[action.user.data._id] : action.user.data})
    default:
    return state;
  }
  }
  