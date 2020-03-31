import React from "react";
import { withRouter } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      session: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      debugger
      // redirect to main page or user profile
      this.props.history.push('/');
      this.props.closeModal();
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <div onClick={this.props.closeModal} className="close-x">
          ×
        </div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="textbox">
            <FontAwesomeIcon icon={faAt} className="icon" />
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
          </div>
          <div className="textbox">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="session-errors">
          {this.renderErrors()}
          </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
