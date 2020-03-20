import React from "react"
import "./footer.css"

class Footer extends React.Component {

    render() {


        return (
            <div className="footer">
                <div className="columns-cont">
                    <div className="nav-column">
                        <h2>Navigate</h2>
                        <div>Home</div>
                        <div>How to Play</div>
                        <div></div>
                    </div>
                    <div className="default-game-column">
                        <h2>Pre-made Games</h2>
                        <div>Avalon</div>
                        <div>Secret Hitler</div>
                        <div>Mafia</div>
                        <div>test</div>
                    </div>
                    <div className="dev-column">
                        <h2>Developers</h2>
                        <div>Songge Sun</div>
                        <div>Skylar Zhu</div>
                        <div>Rakin Rouf</div>
                        <div>Jonathan Odom</div>
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
        )
    }
}


export default Footer