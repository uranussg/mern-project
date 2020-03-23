import React from 'react';
import "./main_page.css";
import backgroundImage from "../../images/gameroom3.jpg";
import Footer from "../footer/footer"

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-background"></div>
        {/* <img className="main-page-image" src='/background.jpg' /> */}
      <div className="testcontent"></div>
      <Footer />
      </div>
    );
  }
}

export default MainPage;