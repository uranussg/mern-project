import axios from "axios";


export const getUsers = users => {
  
  return axios.get(`/api/users/${users.user_ids}`);
};

export const getUser = user_id => {
  // 
  return axios.get(`/api/users/${user_id}`);
};
