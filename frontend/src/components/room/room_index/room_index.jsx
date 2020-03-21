import React, { Component } from 'react'
import RoomIndexItem from './room_index_item';
import backgroundImage from "../../../images/gameroom3.jpg";

class RoomIndex extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  handleRedirect(roomId) {
    return () => this.props.history.push(`/rooms/${roomId}`)
  }

  render() {
    return (
      <div className='room-index-main'>
        <img className="main-page-image" src='/gameroom3.jpg' />
        <h1>All Rooms</h1>
        <ul className="rooms-container">
          {this.props.rooms.map((room) => {
            return <RoomIndexItem handleRedirect={this.handleRedirect.bind(this)}  key={room._id} room={room} />
          })}
        </ul>
      </div>
    )
  }
}

export default RoomIndex