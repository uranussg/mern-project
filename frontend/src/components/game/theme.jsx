import React, { Component } from 'react'
import { getRoles, getThemes} from '../../util/game_api_util'

export default class Theme extends Component {
    constructor(props) {
        super(props)
        this.state={
            themes:[]
        }
    }
    componentDidMount(){
        debugger
        getThemes().then(themes=> {
            debugger
            this.setState({themes: themes.data})
        })
        this.socket = this.props.socket
    
    }

    handleChoose(e) {
        e.preventDefault()
        getRoles(e.target.value, {roome_id: this.props.roomId})
        .then(()=>this.socket.emit('gamemode'), {room_id: this.props.roomId})
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
