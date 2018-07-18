import {combineReducers} from 'redux';  
import reservation from './reservationReducer';

const rootReducer = combineReducers({  
  // short hand property names
  reservation
})

export default rootReducer;