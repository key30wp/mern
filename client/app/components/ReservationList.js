//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import FontIcon from 'material-ui/FontIcon';

export default class ReservationList extends React.Component {

constructor() {
  super();
  this.state = { data: []};
  this.getData = this.getData.bind(this);
}

componentDidMount() {
  this.getData(this);
}

componentWillReceiveProps(nextProps) {
  this.getData(this);
}

getData(e){
  console.log('is it here');
  axios.get('/reservation/getAll')
    .then(function(response) {
      e.setState({data: response.data});
    });
}

render() {
  return (
<div>
    <h2>Reservaciones</h2>
      <Table>
        <thead>
          <tr>
            <th className='desc-col'>Full Name</th>
            <th className='button-col'>Service</th>
            <th className='button-col'>Fecha y Hora</th>
            <th className='button-col'>Tel/Room</th>
            <th className='button-col'>Email</th>
            <th className='button-col'>In charge</th>
          </tr>
      </thead>
      <tbody>
      {this.state.data.map(function(value,key){
        console.log(value,key);
          return  <tr>
                    <td className='desc-col'>{value.fullname}</td>
                    <td className='button-col'>{value.service}</td>
                    <td className='button-col'>{value.startDate}</td>
                    <td className='button-col'>{value.contact}</td>
                    <td className='button-col'>{value.email}</td>
                    <td className='button-col'>{value.service}</td>
                  </tr>;
        })}
        </tbody>
      </Table>
</div>
  );
}
}