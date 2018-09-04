import * as types from './actionTypes';
import axios from 'axios';

export function loadReservations() {  
    return function(dispatch) {
        axios.get('/reservation/getAll').then(response => {
        var recentItems = [];
        response.data.forEach(element => {
          var startDate = new Date(element.startDate);
          var endDate =  new Date(element.endDate);
          var item = {
            _id: element._id,
            name: element.fullname,
            startDateTime: startDate,
            endDateTime : endDate,
            classes : 'color-2',
            service: element.serviceId,
            email: element.email,
            recommended:element.recommended,
            contact: element.contact,
          }
          recentItems.push(item);
        });
        dispatch(loadReservationsSuccess(recentItems));
       }).catch(error => {
        throw(error);
      });
    };
  }

export function loadReservationsSuccess(reservations) {  
  return {type: types.LOAD_RESERVATIONS_SUCCESS, reservations};
}

export function insertReservation(e) {  
  console.log('actions insert', e);
  return function(dispatch) {
    axios.post('/reservation/insert',
    querystring.stringify({
      fullname: e.state.fullname,
      service: e.state.service,
      email: e.state.email,
      contact: e.state.contact,
      recommended: e.state.recommended,
      reservationStartDate: e.state.reservationStartDate.toString(),
      endDate: moment(e.state.reservationStartDate).add(1, 'h').toDate().toString()
    })
    ,{
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      }).then(function(response) {
      dispatch(insertReservationsSuccess(response));
     }).catch(error => {
      dispatch(insertReservationsError(error));
    });
  };
}

export function insertReservationsSuccess(reservations) {  
  console.log('insert success', reservations);
  return {type: types.INSERT_RESERVATIONS_SUCCESS, reservations};
}

export function insertReservationsError(error) {  
  console.log('insert error', error);
  return {type: types.INSERT_RESERVATIONS_ERROR, error};
}


