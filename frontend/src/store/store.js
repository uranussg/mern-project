import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
const composedEnhancer = compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const enhanser =  {
  development: composedEnhancer
  ,
  production: applyMiddleware(thunk)
  
}
const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    enhanser[process.env.NODE_ENV]
  )
);
export default configureStore;

