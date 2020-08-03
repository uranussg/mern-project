import React from 'react';
import About from '../about';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faDice, faPortrait, faQuestionCircle, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import "./user_info.css";

class UserInfo extends React.Component {
  openNewRoomModal() {
    this.props.openModal("newroom");
  }

  openAvatarModal() {
    this.props.openModal("avatars");
  }

  openTutorialModal() {
    this.props.openModal("tutorial")
  }

  componentDidMount() {
    if (this.props.sessionUser) {
      console.log(this.props.sessionUser)
      this.props.fetchUser(this.props.sessionUser.id)
    }
  }


  render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div className="user-controls-container">
          <div className="user-info-container">
            <p className="avatar-header">Your Avatar</p>
            <img
              className="user-info-avatar"
              src={`/avatar${currentUser.avatarId}.png`}
              alt={currentUser.avatarId}
            />
            <div className="user-info-name-container">
              <div className="user-info-name">
                <p>{currentUser.username}</p>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={this.openAvatarModal.bind(this)}
              className="change-avatar-icon"
              icon={faPortrait}
            />
          </div>
          <div className="user-options-container">
            <Link to="/rooms" className="join-game-option user-option">
              <FontAwesomeIcon className="option-icon" icon={faUsers} />
              <p className="option-text">Join a Room</p>
              <FontAwesomeIcon
                className="redirect-icon"
                icon={faAngleDoubleRight}
              />
            </Link>
            <Link onClick={this.openNewRoomModal.bind(this)} className="start-game-option user-option">
              <FontAwesomeIcon className="option-icon" icon={faDice} />
              <p className="option-text">Start a Room</p>
              <FontAwesomeIcon
                className="redirect-icon"
                icon={faAngleDoubleRight}
              />
            </Link>
            <Link onClick={this.openTutorialModal.bind(this)} className="tutorial-game-option user-option">
              <FontAwesomeIcon className="option-icon" icon={faQuestionCircle} />
              <p className="option-text">Tutorial</p>
              <FontAwesomeIcon
                className="redirect-icon"
                icon={faAngleDoubleRight}
              />
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <About />
      );
    }
  }
}

export default UserInfo;