import axios from 'axios';

export const getThemes = () => {
    debugger
  return axios.get('/api/games/roleplay/')
};


export const getRoles = (theme_id, roomData) => { 

    return axios.post(`/api/games/roleplay/${theme_id}`, roomData)
    
}


export const getDistribution = (room_id) => {
    return axios.get(`/api/games/roleplay/${room_id}`)
}