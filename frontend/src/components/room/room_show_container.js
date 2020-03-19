import { connect } from 'react-redux';
import { fetchRoom } from '../../actions/room_actions';
import {fetchUsers, fetchUser} from '../../actions/user_actions'

import Room from './room_show';

const mapStateToProps = (state, ownProps) => {
  
return {
  curr_user: state.session.user,
  room: state.rooms.user||{},
    users: state.users
}
};

export default connect(
  mapStateToProps,
  { fetchRoom, fetchUsers, fetchUser }
)(Room);