

import { RECEIVE_USERS } from "../actions/user_actions";
  

  
  export default function(state = {}, action) {
      const newState = {}
  switch (action.type) {
  case RECEIVE_USERS:
      action.forEach(user => {
          newState[user.id] = user
      });
  return newState;

  default:
  return state;
  }
  }
  