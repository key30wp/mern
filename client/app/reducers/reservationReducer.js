import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function reservationReducer(state = initialState.reservations, action) {
  switch(action.type) {
    case types.LOAD_RESERVATIONS_SUCCESS:
      console.log('reducer LOAD_RESERVATIONS_SUCCESS',action, action.reservations);
      return action.reservations
    case types.INSERT_RESERVATIONS_SUCCESS:
      console.log('reducer INSERT_RESERVATIONS_SUCCESS',action, action.response);
      return action.reservations
    default: action.reservations
      return state;
  }
}