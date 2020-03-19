import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './sesssion/login_form_container';
import SignupFormContainer from './sesssion/signup_form_container';
import Modal from './modal/modal'
import ProfilePageContainer from '../components/profile/profile_container';
import RoomIndexContainer from './room/room_index/room_index_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
        <Route exact path="/profile" component={ProfilePageContainer} />
        <Route exact path="/rooms" component={RoomIndexContainer} />
    </Switch>
  </div>
);

export default App;