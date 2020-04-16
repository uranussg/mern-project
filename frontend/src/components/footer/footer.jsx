import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom'

class Footer extends React.Component {



    render() {


        return (
          <div className="footer">
            <div className="columns-cont">
              <div className="nav-column">
                <h2>Navigate</h2>
                <div><Link to='/'>Home</Link></div>
                <div ><Link to='rooms'>Join a Room</Link></div>
                <div onClick={() => this.props.openModal('tutorial')}>Tutorial</div>
              </div>
              <div className="default-game-column">
                <h2>Pre-made Themes</h2>
                <div>Game of Thrones</div>
                <div>DC Heros</div>
                <div>Harry Potter</div>
              </div>
              <div className="dev-column">
                <h2>Developers</h2>
                <div>
                  Songge Sun
                  <a href="https://github.com/uranussg">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.linkedin.com/in/songge-sun-674b6a138/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
                <div>
                  Skylar Zhu
                  <a href="https://github.com/szhu212">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.linkedin.com/in/skylar-wenyu-zhu-98aa00108/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
                <div>
                  Rakin Rouf
                  <a href="https://github.com/rakinaa">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.linkedin.com/in/rakin-rouf-6607b21a4/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
                <div>
                  Jonathan Odom
                  <a href="https://github.com/odomj5">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.linkedin.com/in/jonathan-odom/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </div>
            <div className="bottom-row">
              <div className="underline"></div>
              <div className="bottom-box">
                <div className="footer-logo">The Game Room</div>
                <div className="footer-detail-cont">
                  <div className="footer-detail">© 2020 The Game Room</div>
                  <div>Terms and Conditions | Cookie Policy | Consent</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}


export default Footer;