import { connect } from 'react-redux';
import { fetchRooms } from '../../../actions/room_actions';
import { enterRoom } from '../../../util/room_api_util';
import RoomIndex from './room_index';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    rooms: Object.values(state.rooms.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRooms: () => dispatch(fetchRooms()),
    enterRoom: (room_id) => dispatch(enterRoom(room_id))
  };
};

const RoomIndexContainer = connect(mapStateToProps, mapDispatchToProps)(RoomIndex);
export default RoomIndexContainer;