import React from "react";
import GOT from "../../images/got.jpg";
import DC from "../../images/dcheros.jpg";
import HP from "../../images/harrypotter.jpg";
import T1 from "../../images/login.jpg";
import S1 from "../../images/signup.jpg";
import JG from "../../images/joinOrCreate.jpg";
import RP from "../../images/rolePlayRow.png";
import CO from "../../images/createOwnRoom.png";

class About extends React.Component {
  render () {

    return (
      <div className="tutorial-div about-addons">
        <h1>About</h1>
        <div className="tutorial-headline">
          <p>The Theme Room is a chat app that allows users to pick a room theme</p>
        </div>
        <div className="tutorial-steps">
          <h2>Instructions</h2>
          <ol>
            <li><img src={S1} /> or <img src={T1} /> to access chat rooms
                
            </li>
            <li>Join an existing room or start a new room to become the game admin</li>
            <img src={JG} className="join-create-img"/> 
            <li>You can send your friends the url of your chat room so that they can join</li>
            <li>The admin can activate a role-playing theme</li>
            <img src={RP}  className="role-play-img"/> 

          </ol>
        </div>
        <div className="themes-cont">
          <h2>Choose Room Theme</h2>
          <div className="choose-theme-cont">
            <div>
              <img src={GOT} alt="Game of Thrones"/>
              <p>Game of Thrones</p>
            </div>
            <div>
              <img src={DC} alt="DC Heros"/>
              <p>DC Heroes</p>
            </div>
            <div>
              <img src={HP} alt="Harry Potter"/>
              <p>Harry Potter</p>
            </div>
            <div>
              <img src={CO} className="create-other-themes"/>
              <p>Create Other Themes</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default About;