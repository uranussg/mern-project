import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link to={'/profile'}>Profile</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                {/* <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link> */}
                <button onClick={() => this.props.openModal('login')}>Login</button>
                <button onClick={() => this.props.openModal('signup')}>Signup</button>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
            <h1>The Game Room</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;