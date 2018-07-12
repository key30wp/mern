import React from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

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
      <Table>
        <thead>
          <tr>
            <th className='button-col'>Edit</th>
            <th className='button-col'>Full Name</th>
            <th className='button-col'>Service</th>
            <th className='button-col'>Fecha y Hora</th>
            <th className='button-col'>Tel/Room</th>
            <th className='button-col'>Email</th>
            <th className='button-col'>In charge</th>
            <th className='button-col'>Delete</th>
          </tr>
      </thead>
      <tbody>
      {this.state.data.map(function(value,key){
        console.log(value,key);
          return  <tr id={value._id}>
                    <td className='table-row'>
                      <IconButton aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </td>
                    <td className='button-col'>{value.fullname}</td>
                    <td className='button-col'>{value.service}</td>
                    <td className='button-col'>{value.startDate}</td>
                    <td className='button-col'>{value.contact}</td>
                    <td className='button-col'>{value.email}</td>
                    <td className='button-col'>{value.recommended}</td>
                    <td className='table-row'>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>;
        })}
        </tbody>
      </Table>
</div>
  );
}
}