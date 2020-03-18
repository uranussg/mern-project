import axios from 'axios';

export const getRooms = () => {
  return axios.get('/api/rooms')
};


export const createRoom = data => {
  return axios.post('/api/rooms/', data)
}

export const enterRoom = (room_id, userData) => { 
  
    return axios.post(`/api/rooms/${room_id}`, userData)
    
}