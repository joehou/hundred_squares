import React from 'react';
import ReactDOM from 'react-dom';
import  {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './css/index.css'

// Default export from a local file
import DevTools from './components/shared/DevTools';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer }),
  composeEnhancers(applyMiddleware(middleware,thunk,logger))
)

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
	  <div>
	    <Component />
	    <DevTools/>
	  </div>
	</ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(App)

if (module && module.hot) {
  module.hot.accept('./components/Blocks', () => {
      renderApp(Blocks);
  });
}
