import React from 'react';
import PropTypes from 'prop-types'
import { ReactAgenda} from 'react-agenda';
import {Button, Modal,  FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';  
// import actions from '../../actions/reservationActions';
import actions from './../../actions/actionCreators';
var bindActionCreators = require('redux').bindActionCreators;
require('moment/locale/en-au'); // this is important for traduction purpose
var querystring = require('querystring');
// import 'bootstrap';

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"#f9b19a" ,
  "color-3":"rgba(235, 85, 59, 1)"
}

var now = new Date();
var items = [];

class Agenda extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        items:items,
        selected:[],
        cellHeight:50,
        locale:"en",
        rowsPerHour:2,
        numberOfDays:4,
        startDate: new Date(),
        reservationStartDate: new Date(),
        fullname: '',
        service: '',
        email: '',
        messageFromServer: '',
        show: false,
        recommended:'',
        edit:false
    }
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewReservation = this.insertNewReservation.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleItemRemove = this.handleItemRemove.bind(this);
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.editReservation = this.editReservation.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
  }

  handleCellSelection(item){
    this.setState({
      reservationStartDate: new Date(item)
  });
    this.handleShow();
  }
  handleItemEdit(item){
    this.setState({ 
      id: item._id,
      fullname: item.name,
      service: item.service,
      email: item.email,
      recommended:item.recommended,
      contact: item.contact,
      edit:true,
      reservationStartDate: item.startDateTime,
      endDateTime: item.endDateTime,
      startDate: item.startDateTime,
      show: true
    });
  }

  handleItemRemove(itemsList,item){
    this.setState({ 
      id: item._id,
    });
    this.deleteReservation(this, item._id)
  }


  handleRangeSelection(item) {
    console.log('handleRangeSelection', item)
  }

  handleClose() {
    this.setState({ 
        show: false,
        fullname: '',
        service: 1,
        email: '',
        reservationStartDate: new Date(),
        endDate: new Date(),
        recommended:'',
        contact:'',
        messageFromServer: '',
        edit: false
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    if(this.props){
      this.setState({
        fullname: this.props.fullname,
        service: this.props.service,
        contact: this.props.contact,
        reservationStartDate: this.props.reservationStartDate,
        email: this.props.email
    });
    }
    
  }
  onClickSave(e) {
    this.insertNewReservation(this);
  }

  onClickEdit(e) {
    this.editReservation(this);
  }

  handleTextChange(e) {
    if (e.target.id == "fullname") {
        this.setState({
            fullname: e.target.value
        });
    }
    if (e.target.id == "service") {
        this.setState({
            service: e.target.value
        });
    }
    if (e.target.id == "email") {
        this.setState({
            email: e.target.value
        });
    }
    if (e.target.id == "contact") {
      this.setState({
          contact: e.target.value
      });
    }
      if (e.target.id == "recommended") {
        this.setState({
          recommended: e.target.value
        });
      }
    }

  editReservation(e){
    this.props.actions.editReservation(e);
    this.handleClose();
  }
  insertNewReservation(e) {
    this.props.actions.insertReservation(e);
    this.handleClose();
  }

  deleteReservation(e, id) {
    if(id){
      console.log('delete reservation');
      this.props.actions.deleteReservation(id);
    }
  }

  getValidationState() {
    const fullname = this.state.fullname;
    if (fullname > 10) return 'success';
    else if (fullname > 5) return 'warning';
    else if (fullname > 0) return 'error';
    return null;
  }
  render() {
    let serviceOptions;
    
    if (this.props.services) {
      serviceOptions = this.props.services.map((value,key) => <option value={value._id}>{value.name}</option>) 
    }
    else {
      serviceOptions = <option>NO SERVICES</option>
    }
    return (
      <div>
        <div className="section-header">
          <h2>Agenda</h2>
        </div>
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          items={this.props.reservations}
          numberOfDays={this.state.numberOfDays}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={this.handleItemEdit.bind(this)}
          onItemRemove={this.handleItemRemove.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          />
          <Modal show={this.state.show} onHide={this.handleClose} className="add-modal">
            <Modal.Header closeButton>
            <Modal.Title>Add Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup
                        id="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Full Name </ControlLabel>
                        <FormControl
                            id='fullname'
                            type="text"
                            value={this.state.fullname}
                            placeholder="Enter fullname"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Email</ControlLabel>
                          <FormControl
                            id='email'
                            type="email"
                            value={this.state.email}
                            placeholder="Enter email"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Contact/Tel/Room</ControlLabel>
                          <FormControl
                            id='contact'
                            type="text"
                            value={this.state.contact}
                            placeholder="Enter your room or your contact number"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Service</ControlLabel>
                          <FormControl
                            id='service'
                            componentClass="select"
                            value={this.state.service}
                            placeholder="Select a service"
                            onChange={this.handleTextChange}
                        >
                        {serviceOptions}
                        </FormControl>
                        <br/>
                        <ControlLabel>Recommended by</ControlLabel>
                          <FormControl
                            id='recommended'
                            type="text"
                            value={this.state.recommended}
                            placeholder="Enter the name of the person in charge of this reservation"
                            onChange={this.handleTextChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={this.state.edit
                  ? this.onClickEdit : this.onClickSave}>{this.state.edit ? 'Edit' :'Save'} </Button>
                <Button onClick={this.handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

Agenda.propTypes = {
  reservations: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  reservationReducer: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    reservations: state.reservation,
    services: state.service
  };
} 

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(Agenda);  