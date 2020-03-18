import React from 'react';
import config from '../../config';
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import MessageInput from './message_input';
// import './App.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: ''
    };
  }

  componentDidMount() {
      
      this.props.fetchRoom(this.props.match.params.roomId, {user_id: this.props.curr_user.id})
      .then(()=>
      { 
        const users = {user_ids: this.props.room.users}
        return this.props.fetchUsers(users)})
    // this.socket = io(config[process.env.NODE_ENV].endpoint);
    this.socket = io("http://localhost:5000");

    // Load the last 10 messages in the window.
    this.socket.on('init', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, ...msg.reverse()],
      }), this.scrollToBottom);
    });

    // Update the chat if a new message in this room is broadcasted .
    this.socket.on('push', (msg) => {
        if(msg.room_id === this.props.room_id)
     { this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom)};
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    // console.log(event);

    // Prevent the form to reload the current page.
    event.preventDefault();

    this.setState((state) => {
    //   console.log(state);
    //   console.log('this', this.socket);
      // Send the new message to the server.
      this.socket.emit('message', {
        user: this.props.curr_user._id,
        content: state.content,
        room: this.props.room._id
      });

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
            user: this.props.curr_user._id,
            content: state.content,
            room: this.props.room._id
        }],
        content: '',
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div className="game-room">
          <div className='gameroom-title'>{this.props.room.title}</div>
        <Paper id="chat" elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <Typography variant="caption" className="name">
                  {el.user}
                </Typography>
                <Typography variant="body" className="content">
                  {el.content}
                </Typography>
              </div>
            );
          })}
        </Paper>
        <form onSubmit={this.handleSubmit}>

        <input
          value={this.state.content}
          onChange={this.handleContent}
        />
        <button type='submit' value='submit'/>
        </form>
      </div>
    );
  }
};

export default Room;