import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import ProfileAvatarSelector from "./profile_avatar_selector";

const mapStateToProps = state => {

//   debugger
  
  const currentUserId = Object.keys(state.users).length > 0 ? state.session.user.id : null
  // debugger
  const avatarId = state.users[currentUserId] ? state.users[currentUserId].avatarId : null
//   debugger
  return {
    currentUser: state.session.user,
    avatarId: avatarId,
    user: Object.values(state.users)[0]
    // currentUserId: state.session.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatarSelector);