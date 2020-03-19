import React from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatarSelector from "./profile_avatar_selector"


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSelector: null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        // debugger
        const userId = this.props.currentUser.id
        this.props.fetchUser(userId)
        // debugger
    }

    handleClick(){
        if (this.state.avatarSelector){
            this.setState({avatarSelector: null})
        }
        else {
            this.setState({avatarSelector:<ProfileAvatarSelector />})
        }
        // debugger
    }

    render(){
        // if (this.props.users)
        const avatarId = this.props.avatarId? this.props.avatarId: "0"
        // debugger
        
        return(
        <div className="profile-page-container">
            <p>{this.props.currentUser.username}</p>
            <img src={`/avatar${avatarId}.png`} onClick={()=>this.handleClick()}/>
            <div>
                {this.state.avatarSelector}
            </div>
        </div>
        )
      
    }

}

export default ProfilePage;