import React from 'react';
import axios from 'axios';
import AddUser from './User/AddUser';
import AddReservation from './Reservation/AddReservation';
import AddService from './Service/AddService';
import UserList from './User/UserList';
import ServiceList from './Service/ServiceList';
import ReservationList from './Reservation/ReservationList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Agenda from './Reservation/Agenda';
import CarouselComponent from './Main/Carousel';

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
      <AddUser/>
      <UserList/>
    </div> 
  } else if(this.state.currentTab == 'Reservation'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <AddReservation/>
      <ReservationList/>
    </div> 
  }
   else if(this.state.currentTab == 'Service'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <AddService/>
      <ServiceList/>
    </div>
  }
   else if(this.state.currentTab == 'Calendar'){
    TabContainer =  <div className="natural-spa__menu-tab">
      <Agenda/>
     </div> 
  } else {
    TabContainer =  <div className="natural-spa__menu-tab">
    Nothing to show
    </div>
 }

  const TabConstant = 
    <Tabs onChange={this.setCurrentTab}>
      <Tab
        label="Agenda"
        value="Calendar"
        className="natural-spa__tab"
        style={{backgroundColor:'#FD7F56'}}
      />
      <Tab
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
