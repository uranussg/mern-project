import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import "./reset.css";
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import Modal from './modal/modal'
import ProfilePageContainer from '../components/profile/profile_container';
import RoomIndexContainer from './room/room_index/room_index_container';
import RoomShowContainer from './room/room_show_container'
import FooterContainer from "./footer/footer_container";
const App = () => {
  return(
  <div>
    <Modal />
    {/* <Switch> */}
        <NavBarContainer />

    {/* </Switch> */}
    <Switch>
          <Route exact path="/" component={MainPage} />
          <ProtectedRoute exact path="/profile" component={ProfilePageContainer} />
          <ProtectedRoute exact path="/rooms" component={RoomIndexContainer} />
          <ProtectedRoute exact path='/rooms/:roomId' component={RoomShowContainer}/>
          {/* <Route exact path="/rooms/new" component={CreateRoomContainer} /> */}     
      </Switch>

    {/* <FooterContainer/> */}
  </div>
);
}

export default App;