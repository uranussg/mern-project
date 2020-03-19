import React from 'react';
import "./profile.css"

class ProfileAvatarSelector extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    // componentDidMount(){
    //     // debugger
    //     const userId = this.props.currentUser.id
    //     this.props.fetchUser(userId).then((user) => this.setState({user: user}))
        
    //     debugger
    // }

    handleClick(e){
        // debugger
        if(typeof this.props.user === "undefined")
        {this.props.fetchUser(this.props.currentUser.id)}
        // debugger
        const updatedUser = this.props.user
        const avatarId = this.props.user.avatarId
        updatedUser["avatarId"] = e.target.getAttribute("value")
        this.props.updateUser(updatedUser)
        // this.setState({user: updatedUser}, () => console.log(this.state))
        // debugger
    
    }

    
    render (){
        // debugger
        const avatarIds = [];
         for (let i = 1; i <= 8; i ++){
             avatarIds.push(i)
         }
     
         // const images =  avatarIds.map(avatarId => <option><img src={`/avatar${avatarId}.png`}/></option>)
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