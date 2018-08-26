import React from 'react';
import {Table} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';  
import PropTypes from 'prop-types';
import moment from 'moment';

class ReservationList extends React.Component {

constructor(props) {
  super(props)
  this.state = { 
    data: []
  }
  this.getServiceName = this.getServiceName.bind(this);
}

getServiceName(id){
  return this.props.services.filter(item => item._id == id);
}

render() {
  return (
    <div>
          <Table>
            <thead>
              <tr>
                <th className='table-row'>Edit</th>
                <th className='table-row'>Name</th>
                <th className='table-row'>Service</th>
                <th className='table-row'>Date / Time</th>
                <th className='table-row'>Duration</th>
                <th className='table-row'>Tel/Room</th>
                <th className='table-row'>Email</th>
                <th className='table-row'>In charge</th>
                <th className='table-row'>Delete</th>
              </tr>
            </thead>
          <tbody>
          {
            this.props.reservations.map((value,key) => {
              var service = this.getServiceName(value.service);
                return  <tr id={value._id}>
                          <td className='table-row'>
                            <IconButton aria-label="Edit">
                              <EditIcon />
                            </IconButton>
                          </td>
                          <td className='table-row'>{value.name}</td>
                          <td className='table-row'>{service[0].name}</td>
                          <td className='table-row'>{moment(value.startDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                          <td className='table-row'>{service[0].duration}</td>
                          <td className='table-row'>{value.contact}</td>
                          <td className='table-row'>{value.email}</td>
                          <td className='table-row'>{value.recommended}</td>
                          <td className='table-row'>
                            <IconButton aria-label="Delete">
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>;
              })
          }
            </tbody>
          </Table>
    </div>
  );
}
}


ReservationList.propTypes = {
  reservations: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired
}; 

function mapStateToProps(state, ownProps) {
  return {
    reservations: state.reservation,
    services: state.service
  };
} 

export default connect(mapStateToProps)(ReservationList);  