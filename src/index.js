import React from 'react';
import ReactDOM from 'react-dom';
import  {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import './index.css';
import App from './App';
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(middleware,thunk,logger))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();
