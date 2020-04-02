import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import WhatsUpEditor from "./whats_up_editor";

const mapStateToProps = state => {

  
//   const currentUserId = Object.keys(state.users).length > 0 ? state.session.user.id : null
  
  return {
    currentUser: state.session.user,
    user: Object.values(state.users)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhatsUpEditor);