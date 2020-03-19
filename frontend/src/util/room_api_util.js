import axios from 'axios';

export const getRooms = () => {
  return axios.get('/api/rooms')
};


export const createRoom = data => {
  return axios.post('/api/rooms/', data)
}

export const enterRoom = (room_id, userData) => { 

    return axios.patch(`/api/rooms/${room_id}`, userData)
    
}


export const outRoom = (room_id, userData) => { 

    return axios.patch(`/api/rooms/${room_id}/exit`, userData)
    
}
// export const changeUserfromRoom = (room_id, userData) => {
//   return axios.patch(`/api/rooms/${room_id}`, userData)
// }