import React from 'react';
import ProfileAvatarSelectorContainer from "./profile_avatar_selector_container"
import WhatsUpEditorContainer from "./whats_up_editor_container"

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSelector: null,
            whatsUp: "",
            whatsUpEditor: null,
            edit: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.setEdit = this.setEdit.bind(this)
    }

    componentDidMount(){
        const userId = this.props.currentUser.id
        this.props.fetchUser(userId)
    }

    setEdit(){
        // 
        if (!this.state.edit){
            this.setState({edit: true})
        } else {
            this.setState({edit: false})
        }
    }

    handleClick(){
        if (this.state.avatarSelector){
            this.setState({avatarSelector: null})
        }
        else {
            this.setState({avatarSelector:<ProfileAvatarSelectorContainer />})
        }
    }

    handleClickWhatsUp(){   
        this.setEdit()
        if(!this.state.whatsUpEditor){this.setState({whatsUpEditor:<WhatsUpEditorContainer setEdit={this.setEdit}/>})}
    }

    render(){
        const avatarId = this.props.avatarId? this.props.avatarId: "0"
        const whatsUpEditor = this.state.edit ? this.state.whatsUpEditor:null
        return(
            <div className="profile-box">
                <div className="profile-page-container">
                    <div className="profile-page-background"></div>
                        <h2>Welcome, {this.props.currentUser.username}!</h2>
                    <div className="profile-images-container" onClick={()=>this.handleClick()}>
                        <img className="main-icon" src={`/avatar${avatarId}.png`}/>
                        <div>
                            {this.state.avatarSelector}
                        </div>
                    </div>
                </div>
                <div className="whats-up-container">
                    <span>What's Up:</span>
                    <span>{this.props.whatsUp}</span>
                    <button className="edit-button" onClick={() => this.handleClickWhatsUp()}></button>
                    {whatsUpEditor} 
                </div>
            </div>
        )
    }
}

export default ProfilePage;