import axios from 'axios';
import moment from 'moment';

export default class reservationService {
    editReservation(e){
      console.log('edit');
      //   axios.post('/reservation/update',
      //     querystring.stringify({
      //       _id: e.state.id,
      //       fullname: e.state.fullname,
      //       service: e.state.service,
      //       email: e.state.email,
      //       contact: e.state.contact,
      //       recommended: e.state.recommended,
      //       reservationStartDate: e.state.reservationStartDate.toString(),
      //       endDate: moment(e.state.reservationStartDate).add(1, 'h').toDate().toString()
      //     }), {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded"
      //       }
      //     }).then(function(response) {
      //     e.setState({
      //       messageFromServer: response.data
      //     });
      // });
      // this.getData();
      // this.handleClose();
    }
    insertNewReservation(e) {
      console.log('insert');
      // axios.post('/reservation/insert',
      // querystring.stringify({
      //   fullname: e.state.fullname,
      //   service: e.state.service,
      //   email: e.state.email,
      //   contact: e.state.contact,
      //   recommended: e.state.recommended,
      //   reservationStartDate: e.state.reservationStartDate.toString(),
      //   endDate: moment(e.state.reservationStartDate).add(1, 'h').toDate().toString()
      // })
      // ,{
      //   headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      //   }).then(function(response) {
      //     console.log('response', response, 'this', this, e);
      // });
      // this.getData();
      // this.handleClose();
    }
    
    deleteReservation(e, id) {
      console.log('delete');
      // if(id){
      //   axios.get('/reservation/delete?id='+ id)
      //     .then(function(response) {
      //   });
      // }
    }
    
    getData(){
      console.log('getall');
      var recentItems = []
      return axios.get('/reservation/getAll')
        // .then(function(response) {
        //  response.data.forEach(element => {
        //    var startDate = new Date(element.startDate);
        //    var endDate =  new Date(element.endDate);
        //    var item = {
        //      _id: element._id,
        //      name: element.fullname,
        //      startDateTime: startDate,
        //      endDateTime : endDate,
        //      classes : 'color-2',
        //      service: element.service,
        //      email: element.email,
        //      recommended:element.recommended,
        //      contact: element.contact,
        //    }
        //    recentItems.push(item);
        //  });
        // });
        // recentItems = this.state.items.concat(recentItems);
        // return recentItems;
        // this.setState({items: recentItems});
    }
    
}