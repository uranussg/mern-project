import React, { Component } from 'react'
import { getRoles, getThemes} from '../../util/game_api_util'
// import { startRoleDistribution } from '../../actions/game_actions'
export default class Theme extends Component {
    constructor(props) {
        super(props)
        this.state={
            themes:[]
        }
        this.handleChoose = this.handleChoose.bind(this)
    }
    componentDidMount(){
        
        getThemes().then(themes=> {
            
            this.setState({themes: themes.data})
        })
        this.socket = this.props.socket
    
    }

    handleChoose(e) {
        e.preventDefault()

        this.props.startRoleDistribution(e.target.getAttribute("value"), {room_id: this.props.roomId})
        .then((roles)=>{
            debugger
            this.socket.emit('gamemode', {room_id: this.props.roomId})
        })
    }
    render() {

        const themeList = this.state.themes.map(theme => {
        return <li><div onClick={this.handleChoose} value={theme._id}>{theme.theme}</div></li>
        })
        return (
            <div>
                <ul>
                    {themeList}
                </ul>
            </div>
        )
    }
}
