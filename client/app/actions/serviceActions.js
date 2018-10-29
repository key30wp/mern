import * as types from './actionTypes';
import axios from 'axios';

export function loadServices() {  
    return function(dispatch) {
      axios.get('/service/getAll')
      .then(function(response) {
        dispatch(loadServicesSuccess(response.data))
      }).catch(error => {
          throw(error);
        });
    };
  }

  export function loadServicesSuccess(services) {  
    console.log('services on action', services);
    return {type: types.LOAD_SERVICES_SUCCESS, services};
  }
