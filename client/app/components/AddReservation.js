//client/components/Add.js
import React from 'react';
import {Button, Modal, Popover, Tooltip, OverlayTrigger , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

class AddReservation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            fullname: '',
            service: '',
            email: '',
            date: '',
            messageFromServer: '',
            show: false
        }
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewUser = this.insertNewUser.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ 
            show: false,
            fullname: '',
            service: '',
            email: '',
            date: '',
            messageFromServer: ''
        });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        this.setState({
            fullname: this.props.fullname
        });
        this.setState({
            service: this.props.service
        });
    }

    onClick(e) {
        this.insertNewUser(this);
    }

    insertNewUser(e) {
        console.log(e.state);
        axios.post('/reservation/insert',
        querystring.stringify({
            fullname: e.state.fullname,
            service: e.state.service,
            email: e.state.email,
            date: e.state.date
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

    handleTextChange(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        if (e.target.id == "fullname") {
            this.setState({
                description: e.target.value
            });
        }
        if (e.target.id == "service") {
            this.setState({
                amount: e.target.value
            });
        }
        if (e.target.id == "email") {
            this.setState({
                description: e.target.value
            });
        }
        if (e.target.id == "date") {
            this.setState({
                amount: e.target.value
            });
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
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        if(this.state.messageFromServer == ''){
            return (
            <div>
                <div>
                    <br/>
                    <Button onClick={this.handleShow} className="">
                        + Add Reservation
                    </Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Reservation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                                <Button bsStyle="danger" bsSize="sm" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove "></span></Button>
                            </Link> */}
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
                                    <ControlLabel>Tel/Room</ControlLabel>
                                     <FormControl
                                        controlId='tel'
                                        type="tel"
                                        value={this.state.email}
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
                                        <option value="select">Masaje Sueco</option>
                                        <option value="other">Masaje con chocoterapia</option>
                                        <option value="other">Facial</option>
                                        <option value="other">Manicure</option>
                                        <option value="other">Pedicure</option>
                                    </FormControl>

                                    <br/>
                                    <ControlLabel>Date</ControlLabel>
                                    <DatePicker hintText="Date" mode="landscape" />
                                    <br/>
                                    <ControlLabel>Time</ControlLabel>
                                    <TimePicker hintText="Time"/>
                                    <br/>
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
            </div>
            )
        }
        else{
            return (
                <div>
                    nothing
                </div>
        )}
    }
}

export default AddReservation;