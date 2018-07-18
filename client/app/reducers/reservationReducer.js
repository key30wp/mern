import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function reservationReducer(state = initialState.reservations, action) {
  console.log('initial state', state, action);  
  switch(action.type) {
    case types.LOAD_RESERVATIONS_SUCCESS:
      return action.reservations
    default: 
      return state;
  }
}