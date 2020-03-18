import axios from "axios";


export const getUsers = users => {
  
  // return axios.get(`/api/users/`, users);
  return axios.get(`/api/users/${users.user_ids}`);
};

