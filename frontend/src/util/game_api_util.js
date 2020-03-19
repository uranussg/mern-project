import axios from 'axios';

export const getThemes = () => {
  return axios.get('/api/games/roleplay/')
};


export const roleDistribution = (theme_id, roomData) => { 

    return axios.post(`/api/games/roleplay/${theme_id}`, roomData)
    
}
