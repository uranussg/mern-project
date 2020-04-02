import React from "react";
import GOT from "../../images/got.jpg";
import DC from "../../images/dcheros.jpg";
import HP from "../../images/harrypotter.jpg";
import "./themes.css"

class Themes extends React.Component {
    render () {

        return (
        <div className="choose-theme-cont">
          <h2>Choose Your Theme</h2>
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
        )
    }
}


export default Themes;