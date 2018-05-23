//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Table, Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import AddUser from './AddUser';
import AddReservation from './AddReservation';
import AddService from './AddService';
import UserList from './UserList';
import ReservationList from './ReservationList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Agenda from './Agenda';


export default class App extends React.Component {

constructor() {
  super();
  this.state = { data: [],
  currentTab:'User'};
  this.getData = this.getData.bind(this);
  this.setCurrentTab = this.setCurrentTab.bind(this);
}

componentDidMount() {
  this.getData(this);
}

componentWillReceiveProps(nextProps) {
  this.getData(this);
}

getData(e){
  axios.get('/getAll')
    .then(function(response) {
      e.setState({data: response.data});
    });
}

setCurrentTab(value){
  this.setState({
    currentTab:value
  })
  console.log(this.state, value);
  
}

render() {
  const TabConstant = <Tabs onChange={this.setCurrentTab}>
        <Tab
          // icon={<MapsPersonPin />}
          label="User"
          value="User"
        />
        <Tab
          // icon={<FontIcon className="muidocs-icon-action-home"></FontIcon>}
          label="Reservation"
          value="Reservation"
        />
        <Tab
          label="Service"
          value="Service"
        />
        <Tab
          label="Calendar"
          value="Calendar"
        />
      </Tabs>
      if(this.state.currentTab == 'User'){
        return (
          <MuiThemeProvider>
          <div className='container-fluid'>
            <Jumbotron 
            className="jumbotron-bg">
              <Row>
                <Col xs={11} md={11}><h1>Natural Spa Manager</h1></Col>
                <Col xs={1} md={1}><Avatar>C</Avatar></Col>
              </Row>
            </Jumbotron>
            {TabConstant}
            <div className="menu-tab">
              <h2>Users</h2>
              <AddUser/>
              <UserList/>
            </div>
          </div>
          </MuiThemeProvider>
      );
    }
    else if(this.state.currentTab == 'Reservation'){
      return (
        <MuiThemeProvider>
        <div className='container-fluid'>
          <Jumbotron 
          className="jumbotron-bg">
            <h1>Natural Spa Manager</h1>
          </Jumbotron>
          {TabConstant}
          <div className="menu-tab">
            <h2>Reservations</h2>
            <AddReservation/>
            <ReservationList/>
          </div>
        </div>
        </MuiThemeProvider>
    );
  }
    else if(this.state.currentTab == 'Service'){
      return (
        <MuiThemeProvider>
        <div className='container-fluid'>
          <Jumbotron 
          className="jumbotron-bg">
            <h1>Natural Spa Manager</h1>
          </Jumbotron>
          {TabConstant}
          <div className="menu-tab">
            <h2>Services</h2>
            <AddService/>
          </div>
        </div>
        </MuiThemeProvider>
    );
    }
    else if(this.state.currentTab == 'Calendar'){
      return (
        <MuiThemeProvider>
        <div className='container-fluid'>
          <Jumbotron 
          className="jumbotron-bg">
            <h1>Natural Spa Manager</h1>
          </Jumbotron>
          {TabConstant}
          <div className="menu-tab">
          <h2>Calendario Semanal</h2>
          <Agenda/>
          </div>
        </div>
        </MuiThemeProvider>
    );
    }
  }
}