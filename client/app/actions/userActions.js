import * as types from './actionTypes';
import axios from 'axios';

export function loadUsers() {  
    return function(dispatch) {
      axios.get('/user/getAll')
      .then(function(response) {
        dispatch(loadUsersSuccess(response.data))
      }).catch(error => {
          throw(error);
          });
      };
    }

  export function loadUsersSuccess(users) { 
    return {type: types.LOAD_USERS_SUCCESS, users};
  }
