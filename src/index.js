import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Router, Switch, Route, Link } from 'react-router-dom';
// add IndexRoute above and the helpers below

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store, {history} from './store';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';

import Login from './pages/Auth/login'

ReactDOM.render(
  <Provider store={store}>

    <Router history={history}>
      <div>
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/app" component={App}/>
      <Route exact path="/login" component={Login}/>
      </Switch>
      </div>
    </Router>
    </Provider>
    , 
    document.getElementById('root'));
registerServiceWorker();