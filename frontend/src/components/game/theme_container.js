import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {getThemes} from '../../util/game_api_util'
import {} from '../../actions/game_actions'
import Theme from './theme'
const mapStateToProps = (state) => {
  return {
    room: Object.values(state.room.user),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThemes: () => dispatch(getThemes()),
    enterRoom: (room_id) => dispatch(enterRoom(room_id))
  };
};

const ThemeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Theme));
export default ThemeContainer;