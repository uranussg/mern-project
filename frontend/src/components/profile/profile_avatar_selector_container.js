import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import ProfileAvatarSelector from "./profile_avatar_selector";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = state => {

  
  const currentUserId = Object.keys(state.users).length > 0 ? state.session.user.id : null
  const avatarId = state.users[currentUserId] ? state.users[currentUserId].avatarId : null
  return {
    currentUser: state.session.user,
    avatarId: avatarId,
    user: Object.values(state.users)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal())
  };
};

const ProfileAvatarSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAvatarSelector);
export default ProfileAvatarSelectorContainer;

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatarSelector);