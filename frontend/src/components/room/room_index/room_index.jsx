import React, { Component } from 'react'
import RoomIndexItem from './room_index_item';

class RoomIndex extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.rooms.map((room) => {
            return <RoomIndexItem  key={room.id} room={room} />
          })}
        </ul>
      </div>
    )
  }
}

export default RoomIndex