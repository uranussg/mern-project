import React from "react";
import GOT from "../../images/got.jpg";
import DC from "../../images/dcheros.jpg";
import HP from "../../images/harrypotter.jpg";
import "./tutorial.css"

class Tutorial extends React.Component {
  render () {

    return (
      <div className="tutorial-div">
        <div className="tutorial-headline">
          <h1>Theme Room Turotial</h1>
          <p>The Theme Room is a chat app that allows users to pick a room theme</p>
        </div>
        <div className="tutorial-steps">
          <h2>Singup or Login to access chat rooms</h2>
          <h2>One logged in, join an existing game or start a new room to become the game admin</h2>
          <h2>The admin can activate a role-playing theme </h2>
        </div>
        <div className="themes-cont">
          <h2>Choose Game Room Theme</h2>
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
          </div>
        </div>
      </div>
    )
  }
}


export default Tutorial;