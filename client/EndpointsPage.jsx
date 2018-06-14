import { CardText, CardTitle, CardActions, Tab, Tabs, RaisedButton } from 'material-ui';
import { GlassCard, Glass, VerticalCanvas } from 'meteor/clinical:glass-ui';

import EndpointDetail from './EndpointDetail';
import EndpointTable from './EndpointsTable';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


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
      currentEndpoint: null
    };

    if (Session.get('endpointFormData')) {
      data.endpoint = Session.get('endpointFormData');
    }
    if (Session.get('endpointSearchFilter')) {
      data.endpointSearchFilter = Session.get('endpointSearchFilter');
    }
    if (Session.get("selectedEndpoint")) {
      data.currentEndpoint = Session.get("selectedEndpoint");
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

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
    return (
      <div id="endpointsPage">
        <VerticalCanvas>
          <GlassCard height="auto">
            <CardTitle
              title="Endpoints"
            />
            <CardText>
              <Tabs id='endpointsPageTabs' default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                 <Tab className="newEndpointTab" label='Initialize' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                  {/* <CardText>
                    <RaisedButton primary={true} label="6 Nodes" onClick={this.initSixNodes } style={{width: '256px'}} /><br /><br />
                    <RaisedButton primary={true} label="12 Nodes" onClick={this.initTwelveNodes } style={{width: '256px'}} /><br /><br />
                    <RaisedButton primary={true} label="Epic Nodes" onClick={this.initEpicNodes } style={{width: '256px'}} /><br /><br />
                    <RaisedButton primary={true} label="Medicare Hospital Nodes" onClick={this.initMedicareHospitalNodes } style={{width: '256px'}} /><br /><br />
                    <RaisedButton primary={true} label="Chicago Hospital Nodes" onClick={this.initChicagoHospitalNodes } style={{width: '256px'}} /><br /><br />
                    <RaisedButton primary={true} label="Apple HealthKit Nodes" onClick={this.initAppleHealthkitNodes } style={{width: '256px'}} /><br /><br />
                  </CardText> */}
                 </Tab>
                 <Tab className="endpointListTab" label='Endpoints' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                   <EndpointTable showBarcodes={true} />
                 </Tab>
             </Tabs>


            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(EndpointsPage.prototype, ReactMeteorData);

export default EndpointsPage;