import React from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid } from 'react-agenda';//Modal
import {Button, Modal, Popover, Tooltip, OverlayTrigger , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
require('moment/locale/en-au'); // this is important for traduction purpose
var querystring = require('querystring');

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}

var now = new Date();

var items = [
  {
   _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2 color-3'
  },

];

export default class Agenda extends React.Component {
  constructor(props){
  super(props);
    this.state = {
      items:items,
      selected:[],
      cellHeight:30,
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
      date:'',
      recommended:''
  }
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewReservation = this.insertNewReservation.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
  }

handleCellSelection(item){
  console.log('handleCellSelection',item)
  this.setState({
    reservationStartDate: new Date(item)
});
  this.handleShow();
}
handleItemEdit(item){
  console.log('handleItemEdit', item)
}
handleRangeSelection(item){
  console.log('handleRangeSelection', item)
}

handleClose() {
  this.setState({ 
      show: false,
      fullname: '',
      service: 0,
      email: '',
      reservationStartDate: '',
      recommended:'',
      contact:'',
      messageFromServer: ''
  });
}

handleShow() {
  this.setState({ show: true });
}

componentDidMount() {
  this.setState({
      fullname: this.props.fullname,
      service: this.props.service,
      contact: this.props.contact,
      reservationStartDate: this.props.reservationStartDate,
      email: this.props.email
  });
}

onClick(e) {
  this.insertNewReservation(this);
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
}

insertNewReservation(e) {
  console.log('inserting reservation', e.state);
  axios.post('/reservation/insert',
  querystring.stringify({
      fullname: e.state.fullname,
      service: e.state.service,
      email: e.state.email,
      contact: e.state.contact,
      recommended: e.state.recommended,
      reservationStartDate: e.state.reservationStartDate
  }), {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  }).then(function(response) {
      e.setState({
          messageFromServer: response.data
      });
  });
}
getValidationState() {
  const fullname = this.state.fullname;
  if (fullname > 10) return 'success';
  else if (fullname > 5) return 'warning';
  else if (fullname > 0) return 'error';
  return null;
}
  render() {
    return (
      <div>
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={this.state.startDate}
          cellHeight={this.state.cellHeight}
          locale={this.state.locale}
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onRangeSelection={this.handleRangeSelection.bind(this)}/>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Full Name </ControlLabel>
                        <FormControl
                            controlId='fullname'
                            type="text"
                            value={this.state.fullname}
                            placeholder="Enter fullname"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Email</ControlLabel>
                          <FormControl
                            controlId='email'
                            type="email"
                            value={this.state.email}
                            placeholder="Enter email"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Contact/Tel/Room</ControlLabel>
                          <FormControl
                            controlId='contact'
                            type="text"
                            value={this.state.contact}
                            placeholder="Enter your room or your contact number"
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <ControlLabel>Service</ControlLabel>
                          <FormControl
                            controlId='service'
                            componentClass="select"
                            value={this.state.service}
                            placeholder="Select a service"
                            onChange={this.handleTextChange}
                        >
                            <option value={0}>Masaje Sueco</option>
                            <option value={1}>Masaje con chocoterapia</option>
                            <option value={2}>Facial</option>
                            <option value={3}>Manicure</option>
                            <option value={4}>Pedicure</option>
                        </FormControl>
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={this.onClick}>Save</Button>
                <Button onClick={this.handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      </div>

    );
  }
}