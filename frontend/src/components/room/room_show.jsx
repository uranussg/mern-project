import React from 'react';
import config from '../../config';
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Theme from '../game/theme'
import "./room_show.css"
import backgroundImage from "../../images/gameroom3.jpg";

// import MessageInput from './message_input';
// import './App.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: ''
    };
    this.handleContent = this.handleContent.bind(this)
    this.handleSubmit =this.handleSubmit.bind(this)
    this.handleExit = this.handleExit.bind(this)  
    this.handleRolePlay = this.handleRolePlay.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.room.users) {
      
      
      if (this.props.room.users.length !== Object.keys(this.props.users).length )
      {
        this.props.fetchUsers({user_ids: this.props.room.users})}
      }
    

    if (this.props.match.params.roomId !== prevProps.room._id ) {
      this.props.fetchRoom(this.props.match.params.roomId, {user_id: this.props.curr_user.id})
    }

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
    if(!this.state.chat)
    {this.socket.on('init', (msgs) => {
      const filteredmsgs = msgs.filter(message=> message.room === this.props.room._id)
      this.setState((state) => ({
        chat: [...state.chat, ...filteredmsgs.reverse()],
      }), this.scrollToBottom);
    });}
    this.socket.on('connection', () => {
      
      console.log(this.socket.connected); // true
    });
    // // Update the chat if a new message in this room is broadcasted .
    this.socket.on('push', (msg) => {

        if(msg.room_id === this.props.room._id)
     { 
      if(!this.props.users[msg.user]){
        this.props.fetchUser(msg.user).then(()=>this.setState((state) => ({
          chat: [...state.chat, msg],
        }), this.scrollToBottom))
      }
        else {
          this.setState((state) => ({
            chat: [...state.chat, msg],
          }), this.scrollToBottom)
        }
      
    }
    }
    
    
    );
      this.socket.on('modeon', gamemode => {
        if (gamemode.room_id === this.props.room._id){
          this.props.fetchDistribution(this.props.room._id)
          .then(()=> this.setState({roles: this.props.roles}))
        }
      })

  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleRolePlay(e) {
    debugger
    this.setState(
      {game: this.state.game? null : <Theme roomId={this.props.room._id} socket={this.socket} />}
    )
  }

  handleExit(e) {
    
    this.props.exitRoom(this.props.room._id, {user_id: this.props.curr_user.id}).then(()=>
    { 
      this.props.history.push('/rooms')})
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
      
      const message = {
        user_id: this.props.curr_user.id,
        content: state.content,
        room_id: this.props.room._id
      }
      this.socket.emit('message', message);

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
            user: this.props.curr_user.id,
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
    // 
    return (
      <div className="game-room">
         <img className="main-page-image" src='/gameroom3.jpg' />
          <div className='gameroom-title'>{this.props.room.title}</div>
          <div className='exit-gameroom'>
            <button onClick={this.handleExit}>Exit</button>
          </div>
          <div className='theme-choose'>
            <button onClick={this.handleRolePlay}>Role-Play</button>
            {this.state.game}
          </div>
        <Paper id="chat" elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <Typography variant="caption" className="name">
                  {this.props.users[el.user]? this.props.users[el.user].username: null}
                  {/* {this.props.users[el.user].username} */}
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
        <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
};

export default Room;