import React from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default class UserList extends React.Component {

constructor() {
  super();
  this.state = { users: []};
  this.getData = this.getData.bind(this);
}

componentDidMount() {
  this.getData(this);
}

componentWillReceiveProps(nextProps) {
  this.getData(this);
}

getData(e){
  axios.get('/user/getAll')
    .then(function(response) {
      e.setState({users: response.data});
    });
}

onClickEdit() {
  
}
render() {
  return (
<div>
      <Table>
        <thead>
          <tr>
          <th className='table-row'>Edit</th>
            <th className='table-row'>Name</th>
            <th className='table-row'>Last name</th>
            <th className='table-row'>Email</th>
            <th className='table-row'>Delete</th>
          </tr>
      </thead>
        <tbody>
        {this.state.users.map(function(value,key){
            return  
            <tr>
              <td className='table-row'>
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </td>
              <td className='table-row'>{value.name}</td>
              <td className='table-row'>{value.lastname}</td>
              <td className='table-row'>{value.email}</td>
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

