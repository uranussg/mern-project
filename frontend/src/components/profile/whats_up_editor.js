import React from 'react';
import "./profile.css"

class WhatsUpEditor extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            whatsUp: "",
            editing: true,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClick(e){
        if(typeof this.props.user === "undefined")
        {this.props.fetchUser(this.props.currentUser.id)}
        const updatedUser = this.props.user
        updatedUser["whatsUp"] = e.target.value
        this.props.updateUser(updatedUser)
    }

    
    handleInput(e){
        // debugger
        this.setState({whatsUp: e.target.value})
    }
    
    handleSubmit(e){
        // debugger
        if(typeof this.props.user === "undefined")
        {this.props.fetchUser(this.props.currentUser.id)}
        const updatedUser = this.props.user
        updatedUser["whatsUp"] = e.target.getAttribute("value")
        this.props.updateUser(updatedUser)
        this.setState({editing: false})
        this.props.setEdit()

    }

    render (){
        
        const display = this.state.editing? (
            <div className="whats-up-editor">               
               <input value={this.state.whatsUp} onChange={this.handleInput}/>
               <button value={this.state.whatsUp} onClick={(e) => this.handleSubmit(e)}>Submit</button> 
            </div>
        ) : null
        return( <div className="whats-up-editor-container">    
            {display}
            </div>
        )
    }
}

export default WhatsUpEditor;