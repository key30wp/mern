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
}

render() {
  var TabContainer;
  console.log('App props state ', this.props);
  if(this.state.currentTab == 'User'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <h2>Users</h2>
      <AddUser/>
      <UserList/>
    </div> 
  } else if(this.state.currentTab == 'Reservation'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <h2>Reservations</h2>
      <AddReservation/>
      <ReservationList/>
    </div> 
  }
   else if(this.state.currentTab == 'Service'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <h2>Services</h2>
      <AddService/>
    </div>
  }
   else if(this.state.currentTab == 'Calendar'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <h2>Calendario Semanal</h2>
      <Agenda/>
      {/* <Agenda addItem={this.props.actions.AddReservation}/> */}
     </div> 
  } else {
    TabContainer =  <div className="natural-spa__menu-tab">
    Nothing to show
    </div>
 }

  const TabConstant = 
    <Tabs onChange={this.setCurrentTab}>
      <Tab
        label="Calendar"
        value="Calendar"
        className="natural-spa__tab"
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
        label="User"
        value="User"
        style={{backgroundColor:'#FD7F56'}}
      />
    </Tabs>
  return (
    <MuiThemeProvider>
    <div className='container-fluid natural-spa__container'>
      <CarouselComponent/>
      {TabConstant}
      {TabContainer}
    </div>
    </MuiThemeProvider>
    );
  }
}
