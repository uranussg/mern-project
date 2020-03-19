import React from 'react';
import { Link } from 'react-router-dom'
import "./navbar.css"

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
      this.props.history.push('/');
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="auth-div">
                <Link to={'/profile'}>Profile</Link>
                <button onClick={() => this.props.openModal('newroom')}>New Room</button>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className="auth-div">
                <button onClick={() => this.props.openModal('login')}>Login</button>
                <button onClick={() => this.props.openModal('signup')}>Signup</button>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="navbar-div">
          <Link to={"/"} className="header-link">
            <h1 className="logo-link">The Game Room</h1>
          </Link>
          {this.getLinks()}
        </div>
      );
  }
}

export default NavBar;