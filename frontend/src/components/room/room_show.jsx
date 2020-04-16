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
      game:''
    };
    this.handleContent = this.handleContent.bind(this)
    this.handleSubmit =this.handleSubmit.bind(this)
    this.handleExit = this.handleExit.bind(this)  
    // this.handleRolePlay = this.handleRolePlay.bind(this)
    // this.handleThemeUnmount = this.handleThemeUnmount.bind(this)
    this.handleExitGame = this.handleExitGame.bind(this)
    this.userDisplay = this.userDisplay.bind(this)
  }

  componentDidMount() {
      this.props.fetchRoom(this.props.match.params.roomId, {user_id: this.props.curr_user.id})
      .then(()=>
      {       
        const users = {user_ids: this.props.room.users}
        if(this.props.room.game){
          this.props.fetchDistribution(this.props.match.params.roomId)
                .then(()=> {
                  const gameroom = document.getElementsByClassName('game-room')[0]
                this.setState({roles: this.props.roles, chat:[], game: this.props.room.game}, ()=>gameroom.classList.add('game-mode', `${this.state.game}`.split(' ').join("")))
                
                })
        }       
        return this.props.fetchUsers(users)})

        .then(()=>{
          console.log(`mount${this.props.curr_user.id === this.props.room.users[0]}`)
          this.setState({admin:this.props.curr_user.id === this.props.room.users[0]})
          this.socket = socket
          this.socket.connect()
      
      if(!this.state.chat.length)
      {  
      this.socket.on('init', (msgs) => {     
          const chatmsgsId = this.state.chat.map(msg => msg._id)
          const filteredmsgs = msgs.filter(message=> message.room_id === this.props.room._id && !chatmsgsId.includes(message._id))
          
          this.setState((state) => ({
            chat: [...state.chat, ...filteredmsgs.reverse()],
            admin: this.props.room.users[0] === this.props.curr_user.id
          }), this.scrollToBottom);
        });   
      }
      const roomData={room_id: this.props.room._id,
                      user_id: this.props.curr_user.id}
      this.socket.emit('join-room', roomData)
      this.socket.on('disconnect', ()=> {
          return this.socket.emit('exit-room', roomData)
      })

      this.socket.on('update-room-info', (roomData)=> {        
        console.log(`updateroom${this.props.match.params.roomId}`)
        // 
        this.props.fetchRoom(this.props.match.params.roomId)
        .then((room)=>
        {   
          console.log(`updatedroomuser${room.data.users}`)
          return this.props.fetchUsers({user_ids: room.data.users})
          })
        .then(()=>{

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
              const gameroom = document.getElementsByClassName('game-room')[0]
              this.setState({roles: gamemode.roles, chat:[], game: gamemode.mode},()=> gameroom.classList.add('game-mode', `${this.state.game}`.split(' ').join(""))) 
              

            }
            else{

                this.props.fetchDistribution(this.props.match.params.roomId)
                .then(()=> {
                  const gameroom = document.getElementsByClassName('game-room')[0]
                this.setState({roles: this.props.roles, chat:[], game: gamemode.mode}, () => gameroom.classList.add('game-mode', `${this.state.game}`.split(' ').join("")))

                })
            }
          }
          else {

            this.props.deleteRoles()
            const gameroom = document.getElementsByClassName('game-room')[0]
            gameroom.classList.remove('game-mode')
            if (this.state.game) gameroom.classList.remove(`${this.state.game}`.split(' ').join(""))
            this.setState({roles: {}, chat:[],game: gamemode.mode})
             
          }
      })

    })
  }

  componentDidUpdate(prevProps) {
        console.log(`component update${this.props.room.users && this.props.room.users.length }`)
        if(this.props.room.users && this.props.room.users.length && (this.props.room.users !== prevProps.room.users))
        {
          console.log(`updatestate${this.props.room.users[0]}`)
          this.setState({admin:this.props.curr_user.id === this.props.room.users[0]})
        }
        

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
    
    const roomId = this.props.room._id
    if(this.state.game && this.state.admin) {
      console.log(`exit room & exit game`)          
        this.props.deleteRoleDistribution(roomId).then(()=> 
        { this.socket.emit('gamemode', {room_id: roomId, mode:''})
          // this.socket.emit('exit-room', 
          // {room_id: this.props.room._id,
          // user_id:this.props.curr_user.id})

          // this.props.exitRoom(this.props.room._id, {user_id: this.props.curr_user.id}).then(()=>
          // {      
          // this.props.history.push('/rooms')})
          })
    }
    // else {
        this.socket.emit('exit-room', 
        {room_id: roomId,
        user_id:this.props.curr_user.id})

        this.props.exitRoom(this.props.room._id, {user_id: this.props.curr_user.id}).then(()=>
        {      
        this.props.history.push('/rooms')})
      // }
   
  }
  // When the user is posting a new message.
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.content){
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
    }, this.scrollToBottom);}
  }

  scrollToBottom() {
    let chat = document.getElementsByClassName('chat-box')[0];
    chat.scrollTop = chat.scrollHeight
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
    const adminSymbol = 
     ( <div className='admin-info'>
        <img src='/star.png' className='admin-symbol'/>
        <span className='admin-instruction'>←Admin</span>
      </div>
    ) 
    const userList = <div className="user-list-section">
      <ul className='user-list'> 
      {
      this.props.room.users.map((userId, idx)=> {
        return(<li key={userId}>
          <img className="user-avatar" src={`/avatar${this.props.users[userId].avatarId}.png`} />
          <div className="user-info">
            <span className="username">{this.props.users[userId].username}</span>
          {idx === 0 ? adminSymbol : null}
            <div className="marquee">
                <span>What's Up:  {this.props.users[userId].whatsUp}</span>
            </div>
          </div>
          </li>)
      })
      }
      </ul>
    </div>
    this.state.userShow? this.setState({userShow: null}): this.setState({userShow: 
    userList})
  }

  // handleThemeUnmount() {
  //   this.setState({game:null,
  //   chat:[]})
  //   const gameroom = document.getElementsByClassName('game-room')[0]
  //   gameroom.classList.add('game-mode', `${this.state.game}`.split(' ').join(""))
  // }

  handleExitGame() {
    this.props.deleteRoleDistribution(this.props.room._id).then(
      ()=> {
        const gameroom = document.getElementsByClassName('game-room')[0]
        this.socket.emit('gamemode', {room_id: this.props.room._id, mode:''})
        gameroom.classList.remove('game-mode')
        if (this.state.game)  gameroom.classList.remove(`${this.state.game}`.split(' ').join(""))
      this.setState({roles: {}, chat:[], game:''})}
    )
  }

  render() {
    return (
      <div className="game-room">
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

              <div className="chat-section">
                    <div className='gameroom-title-bar'>
                        <p>{this.props.room.title}</p>
  
                       <p>{this.state.game}</p>

                  {Object.keys(this.props.roles).length && this.state.admin ?(
                    <button onClick={this.handleExitGame} className="exit-gamemode-button">Exit Game</button>
                    ): null }
                  </div>
                  <div className="test">
                    {this.state.userShow}
                    <div className='chat-box'>
                      <div id="chat" >
                       {this.state.chat.map((el, index) => {
                      return this.messageDisplay(el, index)
                     })}
                     </div>
                </div>
                </div>
                <form onSubmit={this.handleSubmit} className='submit-message-box'>
                <div className='name'>{this.props.roles[this.props.curr_user.id]? this.props.roles[this.props.curr_user.id].name:
                    this.props.users[this.props.curr_user.id]? this.props.users[this.props.curr_user.id].username: this.props.curr_user.id}</div>
                <input minLength='2'
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