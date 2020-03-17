import React from 'react';

const RoomIndexItem = (props) => {
  return (
    <li className="room-info-container">
      <p className="room-title">{props.room.title}</p>
      <p className="room-theme">{"theme here"}</p>
      <p className="room-owner">{"Owner name"}</p>
      <p className="room-date">Created at: {"1:00"}</p>
      <button className="room-join-button">Join</button>
    </li>
  )
}

export default RoomIndexItem;