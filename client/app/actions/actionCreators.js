var reservation = require('./reservationActions');
var service = require('./serviceActions');
import * as types from './actionTypes';
import axios from 'axios';
import moment from 'moment';
const querystring = require('querystring');

var actionCreators = {
    loadReservations: function() {  
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
          dispatch(actionCreators.loadReservationsSuccess(recentItems));
          }).catch(error => {
          throw(error);
          });
      };
    },
    
    loadReservationsSuccess: function(reservations) {  
      return {type: types.LOAD_RESERVATIONS_SUCCESS, reservations};
    },
    
    insertReservation: function(e) {  
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
          dispatch(actionCreators.insertReservationSuccess(response));
         }).catch(error => {
          dispatch(actionCreators.insertReservationError(error));
        });
      };
    },
    
    insertReservationSuccess: function(response) {  
      console.log('insert success', response);
      return {type: types.INSERT_RESERVATIONS_SUCCESS, response};
    },
    
    insertReservationError: function(error) {  
      console.log('insert error', error);
      return {type: types.INSERT_RESERVATIONS_ERROR, error};
    },
    editReservation: function(e) {  
      console.log('actions insert', e);
      return function(dispatch) {
        axios.post('/reservation/update',
        querystring.stringify({
          _id: e.state.id,
          fullname: e.state.fullname,
          service: e.state.service,
          email: e.state.email,
          contact: e.state.contact,
          recommended: e.state.recommended,
          reservationStartDate: e.state.reservationStartDate.toString(),
          endDate: moment(e.state.reservationStartDate).add(1, 'h').toDate().toString()///service time
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
          dispatch(actionCreators.insertReservationSuccess(response));
        }).catch(error => {
          dispatch(actionCreators.insertReservationError(response));
        });
      };
    },
    
    editReservationSuccess: function(response) {  
      console.log('edit success', response);
      return {type: types.EDIT_RESERVATIONS_SUCCESS, response};
    },
    
    editReservationError: function(error) {  
      console.log('edit error', error);
      return {type: types.EDIT_RESERVATIONS_ERROR, error};
    },

    deleteReservation: function(id) {  
      return function(dispatch) {
        axios.get('/reservation/delete?id='+ id).then(response => {
          dispatch(actionCreators.deleteReservationSuccess(response));
        }).catch(error => {
          console.log('error on delete', id);
        throw(error);
        });
      };
    },

    deleteReservationSuccess: function(response) {  
      console.log('delete success', response);
      return {type: types.DELETE_RESERVATIONS_SUCCESS, response};
    },
}

module.exports = actionCreators;