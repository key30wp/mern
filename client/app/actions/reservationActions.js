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
            service: element.service,
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
