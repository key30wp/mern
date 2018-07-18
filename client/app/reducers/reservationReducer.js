import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function reservationReducer(state = initialState.reservations, action) {
  switch(action.type) {
    case types.LOAD_RESERVATIONS_SUCCESS:
      return action.reservations
    default: 
      return state;
  }
}