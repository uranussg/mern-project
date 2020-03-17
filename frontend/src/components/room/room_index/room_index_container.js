import { connect } from 'react-redux';
import { fetchRooms } from '../../../actions/room_actions';
import RoomIndex from './room_index';

const mapStateToProps = ({ entities, session }) => {
  return {
    users: entities.users,
    rooms: Object.values(entities.rooms)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRooms: () => dispatch(fetchRooms())
  };
};

const RoomIndexContainer = connect(mapStateToProps, mapDispatchToProps)(RoomIndex);
export default RoomIndexContainer;