
import React, { Component } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselInner, CarouselItem, CarouselIndicators, CarouselIndicator, View, Mask, Container } from 'mdbreact';
import {Modal, Popover, Tooltip, OverlayTrigger , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import CarouselInfo from './CarouselInfo';
import Button from '@material-ui/core/Button';

export default class Catalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ 
            show: false,
            messageFromServer: ''
        });
      }
      
    handleShow() {
        this.setState({ show: true });
    }

    render(){
        return (
            <div className="natural-spa__catalog">
                <Button onClick={this.handleShow} className="button" variant="outlined" size="large" >
                        View more info about our services
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose} className="modal-info">
                    <Modal.Header closeButton>
                    <Modal.Title>Services</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CarouselInfo></CarouselInfo>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}