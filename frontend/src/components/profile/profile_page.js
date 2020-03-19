import React from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatarSelector from "./profile_avatar_selector"
import ProfileAvatarSelectorContainer from "./profile_avatar_selector_container"

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
            this.setState({avatarSelector:<ProfileAvatarSelectorContainer />})
        }
    }

    render(){
        const avatarId = this.props.avatarId? this.props.avatarId: "0"
    
        
        return(
            <div className="profile-page-container">
                    <p>Welcome, {this.props.currentUser.username}!</p>
                <div className="profile-images-container" onClick={()=>this.handleClick()}>
                    <img src={`/avatar${avatarId}.png`}/>
                    <div>
                        {this.state.avatarSelector}
                    </div>
                </div>
            </div>
        )
      
    }

}

export default ProfilePage;