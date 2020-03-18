

import { RECEIVE_USERS } from "../actions/user_actions";
  

  
  export default function(state = {}, action) {
      const newState = {}
  switch (action.type) {
  case RECEIVE_USERS:
      
      action.users.data.forEach(user => {
          newState[user._id] = user
      });
  return newState;

  default:
  return state;
  }
  }
  