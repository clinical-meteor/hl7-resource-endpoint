import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { RaisedButton } from 'material-ui';

import { 
  CssBaseline,
  Grid, 
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tab, 
  Tabs,
  Typography,
  Box
} from '@material-ui/core';

import EndpointDetail from './EndpointDetail';
import EndpointTable from './EndpointsTable';


import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { get } from 'lodash';



let defaultEndpoint = {
  index: 2,
  id: '',
  username: '',
  email: '',
  given: '',
  family: '',
  gender: ''
};
Session.setDefault('endpointFormData', defaultEndpoint);
Session.setDefault('endpointSearchFilter', '');
Session.setDefault('endpointsTabIndex', 0);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


export class EndpointsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('endpointPageTabIndex'),
      endpoint: defaultEndpoint,
      endpointSearchFilter: '',
      currentEndpoint: null,
      currentEndpointName: '',
      value: Session.get('endpointsTabIndex')
    };

    if (Session.get('endpointFormData')) {
      data.endpoint = Session.get('endpointFormData');
    }
    if (Session.get('endpointSearchFilter')) {
      data.endpointSearchFilter = Session.get('endpointSearchFilter');
    }
    if (Session.get("selectedEndpoint")) {
      data.currentEndpoint = Session.get("selectedEndpoint");
    } else if(get(Meteor, 'settings.public.interfaces.default.channel.endpoint')){
      data.currentEndpoint = get(Meteor, 'settings.public.interfaces.default.channel.endpoint');
      data.currentEndpointName = get(Meteor, 'settings.public.interfaces.default.name', '');
    }
    
    if(process.env.NODE_ENV === "test") console.log("EndpointsPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('endpointPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedEndpoint', false);
    Session.set('endpointUpsert', false);
  }
  // initSixNodes(){
  //   Meteor.call('initSixNodes')
  //   Meteor.setTimeout(function(){
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  // initTwelveNodes(){
  //   Meteor.call('initTwelveNodes')    
  //   Meteor.setTimeout(function(){
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  // initEpicNodes(){
  //   Meteor.call('initEpicNodes')    
  //   Meteor.setTimeout(function(){      
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  // initMedicareHospitalNodes(){
  //   Meteor.call('initMedicareHospitalNodes')    
  //   Meteor.setTimeout(function(){
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  // initChicagoHospitalNodes(){ 
  //   Meteor.call('initChicagoHospitalNodes')       
  //   Meteor.setTimeout(function(){
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  // initAppleHealthkitNodes(){
  //   Meteor.call('initAppleHealthkitNodes')    
  //   Meteor.setTimeout(function(){
  //     Session.set('endpointPageTabIndex', 1);
  //   }, 500)
  // }
  render() {
    //console.log('React.version: ' + React.version);

    let endpoints = [];
    if(this.data.currentEndpoint){
      endpoints.push({
        fhirResource: 'Endpoint',
        status: 'active', 
        name: this.data.currentEndpointName,
        address: this.data.currentEndpoint
      });
    }


    var initializeTab;
    if(this.props.initializeTab){
      initializeTab = <Tab className="newEndpointTab" label='Initialize' style={this.data.style.tab} onActive={ this.onNewTab } value={1}>
      <CardText>
        <RaisedButton primary={true} label="6 Nodes" onClick={this.initSixNodes } style={{width: '256px'}} /><br /><br />
        <RaisedButton primary={true} label="12 Nodes" onClick={this.initTwelveNodes } style={{width: '256px'}} /><br /><br />
        <RaisedButton primary={true} label="Epic Nodes" onClick={this.initEpicNodes } style={{width: '256px'}} /><br /><br />
        <RaisedButton primary={true} label="Medicare Hospital Nodes" onClick={this.initMedicareHospitalNodes } style={{width: '256px'}} /><br /><br />
        <RaisedButton primary={true} label="Chicago Hospital Nodes" onClick={this.initChicagoHospitalNodes } style={{width: '256px'}} /><br /><br />
        <RaisedButton primary={true} label="Apple HealthKit Nodes" onClick={this.initAppleHealthkitNodes } style={{width: '256px'}} /><br /><br />
      </CardText>
     </Tab>
    }
    function handleChange(event, newValue) {
      Session.set('endpointsTabIndex', newValue)
    }

    return (
      <div id="endpointsPage">
        <Container>
          <MuiThemeProvider>
            <Card >
                <CardHeader
                  title="Endpoints"
                />
                <CardContent>
                  <Tabs value={this.data.value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Directory" />
                    <Tab label="New" />
                  </Tabs>
                  <TabPanel value={this.data.value} index={0}>
                    <EndpointTable endpoints={endpoints} />
                  </TabPanel>
                  <TabPanel value={this.data.value} index={1}>
                    <EndpointDetail />
                  </TabPanel>
                </CardContent>
              </Card>
          </MuiThemeProvider>
        </Container>
      </div>
    );
  }
}



ReactMixin(EndpointsPage.prototype, ReactMeteorData);
export default EndpointsPage;