import { connect } from 'react-redux';
import { fetchRoom } from '../../actions/room_actions';
import {fetchUsers} from '../../actions/user_actions'

import Room from './room_show';

const mapStateToProps = (state, ownProps) => ({
  curr_user: state.session.user,
  room: state.rooms[ownProps.match.params.roomId]||{},
    users: state.users
});

export default connect(
  mapStateToProps,
  { fetchRoom, fetchUsers }
)(Room);