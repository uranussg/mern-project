import { connect } from 'react-redux';
import { fetchRoom, exitRoom } from '../../actions/room_actions';
import {fetchUsers, fetchUser} from '../../actions/user_actions'
import {fetchDistribution, startRoleDistribution, deleteRoles, deleteRoleDistribution} from '../../actions/game_actions'

import Room from './room_show';

const mapStateToProps = (state, ownProps) => {
  
return {
  curr_user: state.session.user,
  room: state.rooms.user||{},
  users: state.users,
  roles:state.roles || {}
}
};

export default connect(
  mapStateToProps,
  { fetchRoom, fetchUsers, fetchUser, exitRoom, fetchDistribution, startRoleDistribution, deleteRoles, deleteRoleDistribution }
)(Room);