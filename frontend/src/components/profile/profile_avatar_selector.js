import React from 'react';
import "./profile.css"

class ProfileAvatarSelector extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            selected: this.props.currentUser.avatarId 
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        if(typeof this.props.user === "undefined")
        {this.props.fetchUser(this.props.currentUser.id)}
        const updatedUser = this.props.user
        // const avatarId = this.props.user.avatarId
        updatedUser["avatarId"] = e.target.getAttribute("value")
        this.props.updateUser(updatedUser)
    }

    
    render (){
        const avatarIds = [];
         for (let i = 1; i <= 10; i ++){
             avatarIds.push(i)
         }
         const images =  avatarIds.map(avatarId => <div key={avatarId} ><img value={avatarId} onClick={this.handleClick} src={`/avatar${avatarId}.png`}/></div>)

        return (
        <div className="pofile-avatars-container">
            <div className="avatar_selector">               
                {images}              
            </div>
        </div>
        )
    }
}

export default ProfileAvatarSelector;