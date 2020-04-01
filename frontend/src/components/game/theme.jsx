import React, { Component } from 'react'
import { getRoles, getThemes, createTheme} from '../../util/game_api_util'
// import { startRoleDistribution } from '../../actions/game_actions'
import ThemeForm from './theme_form'
import "./theme.css"
import {socket} from '../socket'

export default class Theme extends Component {
    constructor(props) {
        super(props)
        this.state={
            themes:[],
            createtheme:null
        }
        this.handleChoose = this.handleChoose.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }
    componentDidMount(){
        getThemes().then(themes=> {
            
            this.setState({themes: themes.data})
        })
        this.socket = socket
        this.socket.connect()
    
    }

    handleChoose(e) {

        e.preventDefault()
        const gamemode = e.target.innerText
        // this.props.startRoleDistribution(e.target.getAttribute("value"), {room_id: this.props.room._id})
        getRoles(e.target.getAttribute("value"), {room_id: this.props.room._id})
        .then((roles)=>{
            
            this.socket.emit('gamemode', {room_id: this.props.room._id, mode: gamemode})
            // this.props.unMountMe()
            this.props.closeModal()
        })
    }

    handleCreate(e) {
        e.preventDefault()
        this.setState({createtheme: <ThemeForm closeModal={this.props.closeModal} room={this.props.room} socket={this.socket}/>})
    }

    render() {

        const themeList = this.state.themes.map(theme => {
        return <li key={theme._id}><div onClick={this.handleChoose} value={theme._id}>{theme.theme}</div></li>
        })
        return (
            <div>
                {this.state.createtheme? this.state.createtheme: 
                <ul className='theme-list'>
                    {themeList}
                    <li><div onClick={this.handleCreate}>Create New Theme</div></li>
                </ul>
                }

            </div>
        )
    }
}
