import React from 'react';

const RoomIndexItem = (props) => {
  return (
    <li>
      <p>{props.room.title}</p>
    </li>
  )
}

export default RoomIndexItem;