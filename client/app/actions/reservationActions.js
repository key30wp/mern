// import reservationService from '../services/reservationService';
import * as types from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export function loadReservations() {  
    return function(dispatch) {

        console.log('BEFORE reservation Actions/ getData');
        axios.get('/reservation/getAll').then(response => {
        var recentItems = [];
        console.log('reservation Actions/ getData', response);
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
        console.log(recentItems);
        dispatch(loadReservationsSuccess(recentItems));
       }).catch(error => {
        throw(error);
      });
    };
  }

  export function loadReservationsSuccess(reservations) {  

    console.log('reservation Actions/ Success', reservations);
    return {type: types.LOAD_RESERVATIONS_SUCCESS, reservations};
  }
