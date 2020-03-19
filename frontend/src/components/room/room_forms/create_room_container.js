import { connect } from 'react-redux';
import { buildRoom } from '../../../actions/room_actions';
import { enterRoom } from '../../../util/room_api_util';
import CreateRoomForm from './create_room_form';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    newRoom: state.rooms.new,
    errors: state.errors.rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buildRoom: (roomData) => dispatch(buildRoom(roomData)),
    enterRoom: (room_id) => dispatch(enterRoom(room_id)),
    closeModal: () => dispatch(closeModal())
  };
};

const CreateRoomContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRoomForm));
export default CreateRoomContainer;