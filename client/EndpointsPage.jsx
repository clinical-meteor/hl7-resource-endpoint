import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { GlassCard, Glass, VerticalCanvas, FullPageCanvas } from 'meteor/clinical:glass-ui';

import EndpointDetail from './EndpointDetail';
import EndpointTable from './EndpointsTable';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

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

  render() {
    console.log('React.version: ' + React.version);
    return (
      <div id="endpointsPage">
        <VerticalCanvas>
          <GlassCard height="auto">
            <CardTitle
              title="Endpoints"
            />
            <CardText>
              <Tabs id='endpointsPageTabs' default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                 <Tab className="newEndpointTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                   <EndpointDetail id='newEndpoint' />
                 </Tab>
                 <Tab className="endpointListTab" label='Endpoints' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                   <EndpointTable showBarcodes={true} />
                 </Tab>
                 <Tab className="endpointDetailTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                   <EndpointDetail id='endpointDetails' currentEndpoint={this.data.currentEndpoint} />
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