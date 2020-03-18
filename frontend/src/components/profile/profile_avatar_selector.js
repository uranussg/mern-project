import React from 'react';
import "./profile.css"

const ProfileAvatarSelector = (props) => {
    // designed for 8 avatars for user to choose
    const avatarIds = [];
    for (let i = 1; i <= 8; i ++){
        avatarIds.push(i)
    }

    // const images =  avatarIds.map(avatarId => <option><img src={`/avatar${avatarId}.png`}/></option>)
    const images =  avatarIds.map(avatarId => <option id={avatarId}><img src={`/avatar${avatarId}.png`}/></option>)
        

    // debugger

    return (
     <div className="pofile-avatars-container">
         <select id="avatar_selector">
            {/* {images} */}
            {/* <option style={background-image:url(/avatar0.png)}></option>  */}
        </select>
        

     </div>
    )
}

export default ProfileAvatarSelector;