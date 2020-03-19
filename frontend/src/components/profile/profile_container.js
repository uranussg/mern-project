import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import ProfilePage from "./profile_page";

const mapStateToProps = state => {
   
  // 
  
  const currentUserId = Object.keys(state.users).length > 0 ? state.session.user.id : null
  // 
  const avatarId = state.users[currentUserId] ? state.users[currentUserId].avatarId : null
  // 
  return {
    currentUser: state.session.user,
    avatarId: avatarId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);