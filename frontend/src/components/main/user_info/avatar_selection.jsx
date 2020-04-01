import React from 'react'
import './avatar_selection.css';

class AvatarSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.currentUser.avatarId 
    }
  }

  handleClick(avatarId) {
    return e => {
      
      this.setState({
        selected: avatarId
      })
    }
  }

  handleSubmit() {
    this.props.updateUser({_id: this.props.sessionUser.id, avatarId: this.state.selected});
    this.props.closeModal();
  }

  render() {
    const avatarIds = [];
    for (let i = 1; i <= 8; i ++){
        avatarIds.push(i)
    }

    const images =  avatarIds.map(avatarId => (
      <div className="avatar-selection" key={avatarId} >
        <img className={this.state.selected == avatarId ? "already-selected" : ""}
          alt={avatarId} 
          onClick={this.handleClick(avatarId)} 
          src={`/avatar${avatarId}.png`}
        />
      </div>
    ))

    return (
        <div className="avatars-selection-container">
          {images}
          <button className="avatar-submit" onClick={this.handleSubmit.bind(this)}>Confirm</button>
        </div>
    )
  }
}

export default AvatarSelection;