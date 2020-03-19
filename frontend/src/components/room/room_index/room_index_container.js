import { connect } from 'react-redux';
import { fetchRooms } from '../../../actions/room_actions';
import { updateRoom } from '../../../util/room_api_util';
import RoomIndex from './room_index';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    users: state.users,
    rooms: Object.values(state.rooms.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRooms: () => dispatch(fetchRooms()),
    enterRoom: (room_id) => dispatch(updateRoom(room_id))
  };
};

const RoomIndexContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomIndex));
export default RoomIndexContainer;