import { connect } from "react-redux";
import UserInfo from "./user_info";
import { fetchUser, updateUser } from "../../../actions/user_actions";
import { openModal } from "../../../actions/modal_actions";

const mapStateToProps = state => {
  return {
    sessionUser: state.session.user,
    currentUser: state.session.user.id ? state.users[state.session.user.id] : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

const UserInfoContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfo);
export default UserInfoContainer;
