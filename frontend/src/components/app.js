import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import "./reset.css";
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
// import LoginFormContainer from './sesssion/login_form_container';
// import SignupFormContainer from './sesssion/signup_form_container';
import Modal from './modal/modal'
import ProfilePageContainer from '../components/profile/profile_container';
import RoomIndexContainer from './room/room_index/room_index_container';
import CreateRoomContainer from './room/room_forms/create_room_container';
import RoomShowContainer from './room/room_show_container'
import Footer from "./footer/footer"

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
        <Route exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
        <ProtectedRoute exact path="/profile" component={ProfilePageContainer} />
        <ProtectedRoute exact exact path="/rooms" component={RoomIndexContainer} />
        {/* <Route exact path="/rooms/new" component={CreateRoomContainer} /> */}
        <ProtectedRoute exact path='/rooms/:roomId' component={RoomShowContainer}/>
    </Switch>
    {/* <Footer/> */}
  </div>
);

export default App;