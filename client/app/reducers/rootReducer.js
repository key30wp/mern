import {combineReducers} from 'redux';  
import reservation from './reservationReducer';
import service from './serviceReducer';
import user from './userReducer';

const rootReducer = combineReducers({  
  // short hand property names
  reservation,
  service,
  user
})

export default rootReducer;