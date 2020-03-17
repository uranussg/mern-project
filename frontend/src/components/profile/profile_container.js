import { connect } from "react-redux";
// import { login } from "../../actions/session_actions";
import ProfilePage from "./profile_page";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    avatar: state.session.user.avatarName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);