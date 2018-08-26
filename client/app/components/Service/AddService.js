//client/components/Add.js
import React from 'react';
import {Modal , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Save from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';

var querystring = require('querystring');

class AddService extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serviceName: '',
            serviceDuration: '',
            serviceDescription: '',
            enable: true,
            messageFromServer: '',
            show: false
        }
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.insertNewService = this.insertNewService.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ 
            serviceName: '',
            serviceDuration: '',
            serviceDescription: '',
            enable: true,
            messageFromServer: '',
            show: false
        });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        this.setState({
            serviceName: this.props.serviceName
        });
        this.setState({
            serviceDuration: this.props.serviceDuration
        });
        this.setState({
            serviceDescription: this.props.serviceDescription
        });
        this.setState({
            enable: this.props.enable
        });
    }

    onClick(e) {
        this.insertNewService(this);
    }

    insertNewService(e) {
        console.log('state before insert', e.state);
        axios.post('/service/insert',
        querystring.stringify({
            name: e.state.serviceName,
            duration: e.state.serviceDuration,
            description: e.state.serviceDescription,
            enable: e.state.enable
        }),{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            } 
          }).then(function(response) {
            e.setState({    
                messageFromServer: response.data
            });
        });
        this.handleClose();
    }

    handleChange(e) {
        console.log(e.target.id, e.target.value);
        if (e.target.id == "serviceName") {
            this.setState({
                serviceName: e.target.value
            });
        }
        if (e.target.id == "serviceDuration") {
            this.setState({
                serviceDuration: e.target.value
            });
        }
        if (e.target.id == "serviceDescription") {
            this.setState({
                serviceDescription: e.target.value
            });
        }
        if (e.target.id == "enable") {
            this.setState({
                enable: e.target.checked
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
        if(this.state.messageFromServer == ''){
            return (
                <div>
                    <div className="section-header">
                       <div className="add-button">
                            <Button variant="fab" color="primary" aria-label="add" onClick={this.handleShow} className="add-modal">
                                <AddIcon />
                            </Button> 
                       </div>
                        <h2>Services</h2>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose} className="add-modal">
                        <Modal.Header closeButton>
                        <Modal.Title>Add Service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                >
                                    <ControlLabel>Service name</ControlLabel>
                                    <FormControl
                                        id='serviceName'
                                        type="text"
                                        value={this.state.serviceName}
                                        placeholder="Enter a service name"
                                        onChange={this.handleChange}
                                        className="natural-spa__form-control"
                                    />
                                    <ControlLabel>Duration per Session</ControlLabel>
                                        30 min<Radio
                                            id="serviceDuration"
                                            checked={this.state.serviceDuration === '30'}
                                            onChange={this.handleChange}
                                            value="30"
                                            name="radio-button-demo"
                                            aria-label="30"
                                        />
                                        60 min<Radio
                                            id="serviceDuration"
                                            checked={this.state.serviceDuration === '60'}
                                            onChange={this.handleChange}
                                            value="60"
                                            name="radio-button-demo"
                                            aria-label="30"
                                        />
                                        90 min<Radio
                                            id="serviceDuration"
                                            checked={this.state.serviceDuration === '90'}
                                            onChange={this.handleChange}
                                            value="90"
                                            name="radio-button-demo"
                                            aria-label="30"
                                        />
                                    <br/>
                                    <ControlLabel>Service description</ControlLabel>
                                     <FormControl
                                        id='serviceDescription'
                                        type="textarea"
                                        value={this.state.serviceDescription}
                                        placeholder="Service Description (optional)"
                                        onChange={this.handleChange}
                                        className="natural-spa__form-control"
                                    />
                                    <ControlLabel>Enable</ControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            id="enable"
                                            checked={this.state.enable}
                                            onChange={this.handleChange}
                                            value="enable"
                                            color="primary"
                                            />
                                        }
                                        label="Enable"
                                        />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained"  size="medium" bsStyle="success" onClick={this.onClick}>
                                <Save className="save-icon" />
                                Save
                            </Button>
                            <Button onClick={this.handleClose}>Cancel</Button>

                        </Modal.Footer>
                    </Modal>
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
// export default withStyles(styles)(AddService);
export default AddService;