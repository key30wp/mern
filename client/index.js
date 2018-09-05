import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import 'babel-polyfill'; 
import configureStore from './app/store/configureStore';  
import { Provider } from 'react-redux';  
import {loadReservations} from './app/actions/reservationActions';
import { loadServices } from './app/actions/serviceActions';
import { loadUsers } from './app/actions/userActions';
require('bootstrap/dist/css/bootstrap.min.css');

const store = configureStore();
store.dispatch(loadReservations());
store.dispatch(loadServices());
store.dispatch(loadUsers());

ReactDOM.render(
  <Provider store={store}>
  {/* <Router history={browserHistory} routes={routes} /> */}
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>,
   document.getElementById('app')
);