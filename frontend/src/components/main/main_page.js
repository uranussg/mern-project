import React from 'react';
import "./main_page.css";
import backgroundImage from "../../images/gameroom3.jpg";

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page-container">
        {/* <div className="main-page-background"></div> */}
        <img className="main-page-image" src='/gameroom3.jpg' />
      <div className="testcontent"></div>
      </div>
    );
  }
}

export default MainPage;