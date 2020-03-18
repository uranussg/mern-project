import React from 'react';
import "./main_page.css";
import backgroundImage from "../../images/gameroom3.jpg";

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page-container">
        {/* <div className="main-page-background"></div> */}
        <img className="main-page-image" src={backgroundImage} />
        <p>The Game Room</p>
        <footer>
          Copyright &copy; 2020 the Game Room
        </footer>
      <div className="testcontent"></div>
      </div>
    );
  }
}

export default MainPage;