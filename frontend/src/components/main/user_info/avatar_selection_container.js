import { connect } from "react-redux";
import AvatarSelection from "./avatar_selection";
import { fetchUser, updateUser } from "../../../actions/user_actions";
import { closeModal } from "../../../actions/modal_actions";

const mapStateToProps = state => {
  return {
    sessionUser: state.session.user,
    currentUser: state.users[state.session.user.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal())
  };
};

const AvatarSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(AvatarSelection);
export default AvatarSelectionContainer;
