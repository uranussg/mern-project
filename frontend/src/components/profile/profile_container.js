import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import ProfilePage from "./profile_page";

const mapStateToProps = state => {
  // debugger
  const currentUserId = Object.keys(state.users).length > 0 ? state.session.user.id : null
  const avatarId = state.users[currentUserId] ? state.users[currentUserId].avatarId : null
  const whatsUp = state.users [currentUserId] ? state.users[currentUserId].whatsUp : null
  return {
    currentUser: state.session.user,
    avatarId: avatarId,
    whatsUp: whatsUp,
    user: Object.values(state.users)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);