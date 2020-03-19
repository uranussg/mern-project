import React from 'react';
import "./create_room.css";

class CreateRoomForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidUpdate() {
    if(this.props.newRoom) {
      this.props.history.push(`/rooms/${this.props.newRoom._id}`);
      this.props.closeModal();
    }
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }


  handleSubmit(e) {
    e.preventDefault();

    let room = {
      title: this.state.title,
      user_id: this.props.user.id
    };

    this.props.buildRoom(room);
  }

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
      <div className="room-new-container">
        <h1>New Room</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="textbox">
            <input
              className="room-new-title"
              type="text"
              value={this.state.title}
              onChange={this.update("title")}
              placeholder="Title"
            />
            </div>
          <input type="submit" value="Create New Room" />
        </form>
      </div>
    )
  }
}

export default CreateRoomForm;