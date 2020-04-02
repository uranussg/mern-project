import React from 'react';
import "./main_page.css";
import Footer from "../footer/footer";
import UserInfoContainer from './user_info/user_info_container';
import Themes from "./themes";

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page-container">
        <div className="center-contain">
          <UserInfoContainer />
        </div>
        <div className="main-page-background"></div>
        <div className="testcontent"></div>
        <Themes />
        <Footer />
      </div>
    );
  }
}

export default MainPage;