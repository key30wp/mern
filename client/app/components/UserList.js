//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import FontIcon from 'material-ui/FontIcon';

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

render() {
  return (
<div>
      <Table>
        <thead>
          <tr>
            <th className='button-col'>Name</th>
            <th className='button-col'>Last name</th>
            <th className='button-col'>Email</th>
          </tr>
      </thead>
        <tbody>
        {this.state.users.map(function(value,key){
            return  <tr>
                      <td className='button-col'>{value.name}</td>
                      <td className='button-col'>{value.lastname}</td>
                      <td className='button-col'>{value.email}</td>
                    </tr>;
          })}
          </tbody>
      </Table>
</div>
  );
}
}

