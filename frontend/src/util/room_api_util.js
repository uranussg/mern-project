import axios from 'axios';

export const getRooms = () => {
  return axios.get('/api/rooms')
};


export const createRoom = data => {
  return axios.post('/api/rooms/', data)
}

export const updateRoom = (room_id, userData) => { 
  
    return axios.patch(`/api/rooms/${room_id}`, userData)
    
}

// export const changeUserfromRoom = (room_id, userData) => {
//   return axios.patch(`/api/rooms/${room_id}`, userData)
// }