//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
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
import CarouselComponent from './Carousel';


export default class App extends React.Component {

constructor() {
  super();
  this.state = { data: [],
  currentTab:'Calendar'};
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
  axios.get('/reservation/getAll')
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
  const TabConstant = 
  <Tabs onChange={this.setCurrentTab}>
        <Tab
          label="Calendar"
          value="Calendar"
          className="naturalspa-tab"
          style={{backgroundColor:'#FD7F56'}}
        />
        <Tab
          // icon={<FontIcon className="muidocs-icon-action-home"></FontIcon>}
          label="Reservation"
          value="Reservation"
          style={{backgroundColor:'#FD7F56'}}
        />
        <Tab
          label="Service"
          value="Service"
          style={{backgroundColor:'#FD7F56'}}
        />
        <Tab
          // icon={<MapsPersonPin />}
          label="User"
          value="User"
          style={{backgroundColor:'#FD7F56'}}
        />
        
      </Tabs>
      if(this.state.currentTab == 'User'){
        return (
          <MuiThemeProvider>
          <div className='container-fluid'>
            <CarouselComponent/>
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
          <CarouselComponent/>
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
          <CarouselComponent/>
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
          <CarouselComponent/>
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