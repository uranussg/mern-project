import React from 'react';
import "./room_index.css"

const RoomIndexItem = (props) => {
  return (
    <li className="room-info-container">
      {/* <div className="inner=box">  */}
        <div className="room-info-left">
          <p className="room-title">{props.room.title}</p>
          <p className="room-theme">{"theme here"}</p>
        </div>
        <div className="room-info-right">
          <button onClick={props.handleRedirect(props.room._id)} className="room-join-button">Join Room</button>
          <p className="room-owner">{"Owner name"}</p>
          <p className="room-date">Created at: {"1:00"}</p>
        {/* </div> */}
      </div>
    </li>
  )
}

export default RoomIndexItem;