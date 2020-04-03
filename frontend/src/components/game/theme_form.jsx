import React, { Component } from 'react'
import "./theme.css"

export default class ThemeForm extends Component {
    constructor(props){
        super(props)
        this.state={
            rolesInput: null,
            room_id: this.props.room._id,
            theme: '',
            roles:{}

        }
        this.socket= this.props.socket
        this.roleForm = this.roleForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    roleForm(e){
        const roleList = []
        const num = parseInt(e.target.elements[0].value)
        for(let i = 0; i < num; i+=1) 
        {       
            roleList.push(<li>
            <input type="text" id={`role${i}`} onChange={this.handleChange(i)} value={this.state.roles[`${i}`]}/>
            </li>)
            
        }
        roleList.push(<button type='submit' onClick={this.handleSubmit}>Submit</button>)
        this.setState({rolesInput: roleList})
    }

    handleChange(type) {
        return (e) => {
            e.preventDefault()

            type ==='theme'? this.setState({[type]: e.target.value}) 
            : this.setState({roles: Object.assign(this.state.roles,{[type]:e.target.value} )})
            
        }
    }

    handleSubmit(e) {
        this.socket.emit('createtheme', this.state)
        // this.props.unMountMe()
        this.props.closeModal()


    }

    render() {

        return (
            <div className="create-theme-form">
                    <div className='theme-name'>
                        <lable> Theme Name
                           <input type="text" onChange={this.handleChange('theme')} value={this.state.theme}/>
                        </lable>
                    </div>
                    <div>
                        {this.state.rolesInput?
                        <div className="character-form">
                            <p>Chatacter Names</p>
                         {this.state.rolesInput}
                         </div>
                         :
                         (   
                        <form  onSubmit={this.roleForm}>
                         <label for="rolesnumber">Number of Roles:</label>
                         <input type="number" id='rolesnumber' min={this.props.room.users.length}/>
                         <button type='submit' >Yep!</button>
                         </form>
                         )}
                    
                    </div>
            </div>
        )
    }
}
