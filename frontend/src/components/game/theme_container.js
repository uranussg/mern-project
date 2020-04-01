import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {createTheme, getThemes } from '../../util/game_api_util'
import {startRoleDistribution} from '../../actions/game_actions'
import { closeModal } from '../../actions/modal_actions';
import Theme from './theme'
const mapStateToProps = (state, ownProps) => {
  
  return {
    room: state.rooms.user,
    socket: ownProps.socket
  };
};


const ThemeContainer = withRouter(connect(mapStateToProps, {createTheme, startRoleDistribution, getThemes, closeModal})(Theme));
export default ThemeContainer;