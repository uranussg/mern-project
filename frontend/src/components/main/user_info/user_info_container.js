import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { openModal, closeModal} from "../../actions/modal_actions"


const mapStateToProps = state => {
  return {
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
