import React from 'react';
import Paper from '@material-ui/core/Paper';
import "./room_show.css"
import {socket} from '../socket'

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      roles:{},
      userShow: null,
      game:false
    };
    this.handleContent = this.handleContent.bind(this)
    this.handleSubmit =this.handleSubmit.bind(this)
    this.handleExit = this.handleExit.bind(this)  
    // this.handleRolePlay = this.handleRolePlay.bind(this)
    // this.handleThemeUnmount = this.handleThemeUnmount.bind(this)
    this.handleExitGame = this.handleExitGame.bind(this)
    this.userDisplay = this.userDisplay.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.room.users) {
      
      
  //     if (this.props.room.users.length !== Object.keys(this.props.users).length )
  //     {
  //       this.props.fetchUsers({user_ids: this.props.room.users})}
  //     }
    

  //   if (this.props.match.params.roomId !== prevProps.room._id ) {
  //     this.props.fetchRoom(this.props.match.params.roomId, {user_id: this.props.curr_user.id})
  //   }

  // }

  componentDidMount() {
      console.log(this.props.match.params.roomId)
      this.props.fetchRoom(this.props.match.params.roomId, {user_id: this.props.curr_user.id})
      .then(()=>
      {       
        const users = {user_ids: this.props.room.users}       
        return this.props.fetchUsers(users)})

        .then(()=>{
      this.socket = socket
      this.socket.connect()
      
      // if(!this.state.chat.length)
      // {  
      // this.socket.on('init', (msgs) => {     
      //     const chatmsgsId = this.state.chat.map(msg => msg._id)
      //     const filteredmsgs = msgs.filter(message=> message.room_id === this.props.room._id && !chatmsgsId.includes(message._id))
          
      //     this.setState((state) => ({
      //       chat: [...state.chat, ...filteredmsgs.reverse()],
      //       admin: this.props.room.users[0] === this.props.curr_user.id
      //     }), this.scrollToBottom);
      //   });   
      // }
      const roomData={room_id: this.props.room._id,
                      user_id: this.props.curr_user.id}
      this.socket.emit('join-room', roomData)
      this.socket.on('disconnect', ()=> {
          this.socket.emit('exit-room', roomData)
      })

      this.socket.on('update-room-info', ()=> {        
        // if (roomData.room_id == this.props.room._id)
        this.props.fetchRoom(this.props.room._id)
        .then(()=>
        { 
          const users = {user_ids: this.props.room.users}
          return this.props.fetchUsers(users)
          })
        .then(()=>{
          console.log(this.props.room)
          return this.setState({admin:this.props.curr_user.id === this.props.room.users[0]})
        })       
      })

      this.socket.on('push', (msg) => {
            this.setState((state) => ({
              chat: [...state.chat, msg],
            }), this.scrollToBottom)
      });
      this.socket.on('modeon', gamemode => {
          console.log(gamemode)  
          if (gamemode.mode)
          {
            if(gamemode.roles){              
              this.props.receiveRoles(gamemode.roles)
              this.setState({roles: gamemode.roles, chat:[], game: gamemode.mode}) 
              
              const gameroom = document.getElementsByClassName('game-room')[0]
              gameroom.classList.add('game-mode')
            }
            else{

                this.props.fetchDistribution(this.props.room._id)
                .then(()=> {
                this.setState({roles: this.props.roles, chat:[], game: gamemode.mode})
                const gameroom = document.getElementsByClassName('game-room')[0]
                gameroom.classList.add('game-mode')
                })
            }
          }
          else {

            this.props.deleteRoles()
              this.setState({roles: {}, chat:[],game: gamemode.mode})
              const gameroom = document.getElementsByClassName('game-room')[0]
              gameroom.classList.remove('game-mode')
          }
      })

    })
  }

  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }
  // handleRolePlay(e) {    
  //   this.setState(
  //     // {game: this.state.game? null : <Theme room={this.props.room} 
  //     // socket={this.socket} startRoleDistribution={this.props.startRoleDistribution}
  //     // unMountMe={this.handleThemeUnmount}/>}
  //     {game: this.state.game? null : <Modal modal='theme' socket={this.socket}
  //     unMountMe={this.handleThemeUnmount}/>}
  //   )
  // }
  handleExit(e) {
    this.socket.emit('exit-room', 
    {room_id: this.props.room._id,
      user_id:this.props.curr_user.id})
    this.props.exitRoom(this.props.room._id, {user_id: this.props.curr_user.id}).then(()=>
    {      
      this.props.history.push('/rooms')})
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    event.preventDefault();
    this.setState((state) => {

      const message = {
        user_id: this.props.curr_user.id,
        content: state.content,
        room_id: this.props.room._id
      }
      
      this.socket.emit('message', message);
      return {
        chat: [...state.chat, {
            user_id: this.props.curr_user.id,
            content: state.content,
            room_id: this.props.room._id
        }],
        content: '',
      };
    }, this.scrollToBottom);
  }

  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }


  messageDisplay(el, index) {
    const mgsClass = this.props.curr_user.id === el.user_id ? 'self-message' : 'other-users-message'
    const imgsrc = this.props.roles[el.user_id] ? `ThemeAvatars/${this.props.roles[el.user_id].theme_id||'self'}/${this.props.roles[el.user_id].role_avator_id}.png` :
    this.props.users[el.user_id]? `/avatar${this.props.users[el.user_id].avatarId}.png`: null

    return (<div key={index} className={mgsClass}>
        <div><img src={imgsrc} /></div>
        <div className='text-holder'>
          <div className="name">
          {this.props.roles[el.user_id]? this.props.roles[el.user_id].name:
            this.props.users[el.user_id]? this.props.users[el.user_id].username: el.user_id}
          
          </div>
          <div className="content">
            {el.content}
          </div>
        </div>
      </div>)
  }

  userDisplay() {
    const userList = Object.keys(this.props.users).map(userId=> {
      return(<li>
        <img src={`/avatar${this.props.users[userId].avatarId}.png`} />
        <div>{this.props.users[userId].username}</div>
        </li>)
    });
    this.state.userShow? this.setState({userShow: null}): this.setState({userShow: userList})
  }

  // handleThemeUnmount() {
  //   this.setState({game:null,
  //   chat:[]})
  //   const gameroom = document.getElementsByClassName('game-room')[0]
  //   gameroom.classList.add('game-mode')
  // }

  handleExitGame() {
    this.props.deleteRoleDistribution(this.props.room._id).then(
      ()=> {
        this.socket.emit('gamemode', {room_id: this.props.room._id, mode:false})
        const gameroom = document.getElementsByClassName('game-room')[0]
        gameroom.classList.remove('game-mode')
      this.setState({roles: {}, chat:[], game:''})}
    )
  }

  render() {
  
    return (
      <div className="game-room">
         {/* <img className="main-page-image" src='/gameroom3.jpg' /> */}
         <div className="game-room-container">
         <div className="show-page-background"></div>
       
            <div className="show-page-buttons">
                <div className='exit-gameroom'>
                  <button onClick={this.handleExit}>Exit Room</button>
                </div>
                {this.state.admin && !this.state.game?
                <div className="role-play-dropdown">
                  <div className='theme-choose'>
                    <button onClick={()=>this.props.openModal('theme')}>Role-Play</button>
                  </div>
                </div> : null}
                <div className='show-users'>
                  <button onClick={this.userDisplay}>Users</button>
                </div>
            </div>
            <div className="chat-section-container">
              <div className='user-list-container'>
                <ul className='user-list'>
                  {this.state.userShow}
                </ul>
              </div>

              <div className="chat-section">
                    <div className='gameroom-title-bar'>
                      {this.props.room.title}
  
                    <p>{this.state.game}</p>

                  {Object.keys(this.props.roles).length && this.state.admin ?(
                    <button onClick={this.handleExitGame} className="exit-gamemode-button">Exit Game</button>
                  ): null }
                  </div>
                  <div className='chat-box'>
                <Paper id="chat" elevation={3} >
                  {this.state.chat.map((el, index) => {
                    return this.messageDisplay(el, index)
                  })}
                </Paper>
                </div>
                <form onSubmit={this.handleSubmit} className='submit-message-box'>
                <div className='name'>{this.props.roles[this.props.curr_user.id]? this.props.roles[this.props.curr_user.id].name:
                    this.props.users[this.props.curr_user.id]? this.props.users[this.props.curr_user.id].username: this.props.curr_user.id}</div>
                <input
                  value={this.state.content}
                  onChange={this.handleContent}
                />
                <button type='submit' className='submit-button'>Submit</button>
                </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
};

export default Room;