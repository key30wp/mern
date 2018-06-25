//client/components/Add.js
import React from 'react';
import {Button, Modal, Popover, Tooltip, OverlayTrigger , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import {Link} from 'react-router-dom';
// import 'material-design-icons';
var querystring = require('querystring');

class AddService extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
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
            name: '',
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
            name: this.props.name
        });
        this.setState({
            service: this.props.service
        });
    }

    onClick(e) {
        this.insertNewUser(this);
    }

    insertNewUser(e) {
        console.log(e);
        console.log(e.state);
        axios.post('/insert',
        querystring.stringify({
            name: e.state.name,
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
        if (e.target.id == "name") {
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
        const name = this.state.name;
        if (name > 10) return 'success';
        else if (name > 5) return 'warning';
        else if (name > 0) return 'error';
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
                        <i class="material-icons">
                            add
                        </i>
                    </Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                >
                                    <ControlLabel>Full Name </ControlLabel>
                                    <FormControl
                                        controlId='name'
                                        type="text"
                                        value={this.state.name}
                                        placeholder="Enter name"
                                        onChange={this.handleTextChange}
                                    />
                                    <br/>
                                    <ControlLabel>Email</ControlLabel>
                                     <FormControl
                                        controlId='email'
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Enter last name"
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
                                     <Calendar></Calendar>
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

export default AddService;