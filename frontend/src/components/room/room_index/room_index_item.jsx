import React from 'react';
import "./room_index.css"

const RoomIndexItem = (props) => {
  const gamemode= props.room.game? 'in-game' : 'avaliable'
  let date = new Date(props.room.date)
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let month = date.getMonth()
  let day = date.getUTCDate()
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  month = (month < 10) ? `0${month}` : month;
  day = (day < 10) ? `0${day}` : day;
  return (
    <li className={`room-info-container ${gamemode}`}>
        <div className="room-info-left">
          <p className="room-title">{props.room.title}</p>
          <p className="room-theme">{props.room.game? `Playing: ${props.room.game}` : ''}</p>
        </div>
        <div className="room-info-right">
          {props.room.game? <button className="room-join-button">Unable to Join </button>:
          <button onClick={ props.handleRedirect(props.room._id)} className="room-join-button">Join Room</button>}
          <p className="room-date">Created at: {month}-{day} {hours}:{minutes}:{seconds}</p>
      </div>
    </li>
  )
}

export default RoomIndexItem;