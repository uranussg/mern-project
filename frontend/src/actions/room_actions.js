
import { getRooms, enterRoom, createRoom } from '../util/room_api_util';

export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";

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

export const fetchRooms = () => dispatch => (
  getRooms()
    .then(rooms => dispatch(receiveRooms(rooms)))
    .catch(err => console.log(err))
);

export const getIntoRoom = room_id => dispatch => (
    enterRoom(room_id)
        .then(room=>dispatch(receiveRoom(room)))
        .catch(err => console.log(err))
)

export const buildRoom = data => dispatch => (
  createRoom(data)
    .then(room => dispatch(receiveNewRoom(room)))
    .catch(err => console.log(err))
);