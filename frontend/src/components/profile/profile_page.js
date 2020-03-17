import React from 'react';
import { Link } from 'react-router-dom';
import Avatar0 from "../../images/avatars/userpic.png";
import Avatar1 from "../../images/avatars/avatar1.png";
import Avatar2 from "../../images/avatars/avatar2.png";

class ProfilePage extends React.Component {

    render(){
        return(
        <div className="profile-page-container">
            <img src={Avatar0}/>
            {/* <img src={Avatar1}/> */}
            {/* <img src={Avatar2}/> */}
        </div>
        )
    }

}

export default ProfilePage;