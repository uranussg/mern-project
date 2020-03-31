import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { openModal, closeModal} from "../../actions/modal_actions"


const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    currentUser: state.session.user,
    isAuthenticated: state.session.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    otherForm: (
      <a onClick={() => dispatch(openModal('signup'))}>Signup</a>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
