import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import FontIcon from 'material-ui/FontIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class ServiceList extends React.Component {

constructor() {
  super();
  this.state = { services: []};
  this.getData = this.getData.bind(this);
}

componentDidMount() {
  this.getData(this);
}

componentWillReceiveProps(nextProps) {
  this.getData(this);
}

getData(e){
  axios.get('/service/getAll')
    .then(function(response) {
      e.setState({services: response.data});
    });
}

render() {
  console.log('services', this.state.services);
  return (
<div>
      <Table>
        <thead>
          <tr>
            <th className='button-col'>Name</th>
            <th className='button-col'>Duration</th>
            <th className='button-col'>Description</th>
            <th className='button-col'></th>
            
          </tr>
      </thead>
        <tbody>
        {this.state.services.map(function(value,key){
            return  <tr>
                      <td className='table-row'>{value.name}</td>
                      <td className='table-row'>{value.duration}</td>
                      <td className='table-row'>{value.description}</td>
                      {/* <td className='button-col'>{value.enable}</td> */}
                      <td>
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

