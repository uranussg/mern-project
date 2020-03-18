import axios from "axios";


export const getUsers = user_ids => {
  return axios.post(`/api/users/`, user_ids);
};

