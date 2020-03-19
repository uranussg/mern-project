
import { getRooms, enterRoom, createRoom, outRoom } from '../util/room_api_util';

export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";
export const EXIT_ROOM ='EXIT_ROOM'

export const receiveRooms = rooms=> ({
  type: RECEIVE_ROOMS,
  rooms
});


export const receiveNewRoom = room => ({
  type: RECEIVE_NEW_ROOM,
  room
})

export const receiveRoom = room => ({
    type: RECEIVE_ROOM,
    room
})

export const getoutRoom = (room) => ({
  type: EXIT_ROOM,
  room
})

export const exitRoom = (room_id, userData) =>dispatch=> {
  
  return outRoom(room_id, userData)
    .then(room => {
      
      dispatch(getoutRoom(room))})
    .catch(err => console.log(err))
}

export const fetchRooms = () => dispatch => (
  getRooms()
    .then(rooms => dispatch(receiveRooms(rooms)))
    .catch(err => console.log(err))
);

export const fetchRoom = (room_id, userData) => dispatch => {
  
 return enterRoom(room_id, userData)
  .then(room=>{
    
    return dispatch(receiveRoom(room))})
  .catch(err => console.log(err))
}


export const buildRoom = data => dispatch => (
  createRoom(data)
    .then(room => dispatch(receiveNewRoom(room)))
    .catch(err => console.log(err))
);