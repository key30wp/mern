import React from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  

class ServiceList extends React.Component {

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
    return (
  <div>
        <Table>
          <thead>
            <tr>
              <th className='button-col'>Edit</th>
              <th className='button-col'>Name</th>
              <th className='button-col'>Duration</th>
              <th className='button-col'>Description</th>
              <th className='button-col'>Delete</th>
              
            </tr>
        </thead>
          <tbody>
          {this.state.services.map(function(value,key){
              return  <tr>
                        <td className='table-row'>
                          <IconButton aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </td>
                        <td className='table-row'>{value.name}</td>
                        <td className='table-row'>{value.duration}</td>
                        <td className='table-row'>{value.description}</td>
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

ServiceList.propTypes = {
  services: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log(state, 'state at agenda');
  return {
    services: state.services
  };
} 

export default connect(mapStateToProps)(ServiceList);  

