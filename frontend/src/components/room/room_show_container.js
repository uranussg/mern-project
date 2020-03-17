import { connect } from 'react-redux';
import {  } from '../../actions/room_actions';

import Room from './navbar';

const mapStateToProps = (state, ownProps) => ({
  curr_user: state.session.user,
  room: state.rooms[ownProps.match.params.roomId]
});

export default connect(
  mapStateToProps,
  { logout }
)(Room);