import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// We'll create this soon
import App from './app';

const Root = ({ store, socket }) =>{
  return (
  <Provider store={ store } socket={socket}>
    <HashRouter>
      <App socket={socket}/>
    </HashRouter>
  </Provider>
);

} 
export default Root;