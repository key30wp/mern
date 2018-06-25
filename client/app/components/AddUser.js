//client/components/Add.js
import React from 'react';
import {Button, Modal, Popover, Tooltip, OverlayTrigger , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

class AddUser extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
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
            lastname: '',
            email: '',
            password: '',
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
            lastname: this.props.lastname
        });
        this.setState({
            email: this.props.email
        });
        this.setState({
            password: this.props.password
        });
    }

    onClick(e) {
        this.insertNewUser(this);
        
    }

    insertNewUser(e) {
        console.log('state before insert', e.state);
        axios.post('/user/insert',
        querystring.stringify({
            name: e.state.name,
            lastname: e.state.lastname,
            email: e.state.email,
            password: e.state.password
        }),{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            } 
          }).then(function(response) {
            console.log('response',response);
            e.setState({    
                messageFromServer: response.data
            });
        });
    }

    handleTextChange(e) {
        if (e.target.id == "name") {
            this.setState({
                name: e.target.value
            });
        }
        if (e.target.id == "lastname") {
            this.setState({
                lastname: e.target.value
            });
        }
        if (e.target.id == "email") {
            this.setState({
                email: e.target.value
            });
        }
        if (e.target.id == "password") {
            this.setState({
                password: e.target.value
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
                        <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                >
                                    <ControlLabel>Name </ControlLabel>
                                    <FormControl
                                        id='name'
                                        type="text"
                                        value={this.state.name}
                                        placeholder="Enter name"
                                        onChange={this.handleTextChange}
                                        // autoComplete='Name'
                                    />
                                    <br/>
                                    <ControlLabel>Last name</ControlLabel>
                                     <FormControl
                                        id='lastname'
                                        type="text"
                                        value={this.state.lastname}
                                        placeholder="Enter last name"
                                        onChange={this.handleTextChange}
                                        // autoComplete='Last Name'
                                    />
                                    <br/>
                                    <ControlLabel>Email</ControlLabel>
                                     <FormControl
                                        id='email'
                                        type="text"
                                        value={this.state.email}
                                        placeholder="Enter email"
                                        onChange={this.handleTextChange}
                                        // autoComplete='email'
                                    />
                                    <br/>
                                    <ControlLabel>Password</ControlLabel>
                                     <FormControl
                                        id='password'
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Enter password"
                                        onChange={this.handleTextChange}
                                        // autoComplete='password'
                                    />
                                    <br/>
                                    <ControlLabel>Type</ControlLabel>
                                     <FormControl
                                        id='type'
                                        componentClass="select"
                                        value={this.state.service}
                                        placeholder="Select a service"
                                        onChange={this.handleTextChange}
                                        // autoComplete='Type'
                                    >
                                        <option value="select">Admin</option>
                                        <option value="other">Service</option>
                                        <option value="other">Client</option>
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

export default AddUser;