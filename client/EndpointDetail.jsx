import { CardActions, CardText } from 'material-ui/Card';
import { get, has, set } from 'lodash';
import { insertEndpoint, removeEndpointById, updateEndpoint } from 'meteor/clinical:hl7-resource-endpoint';


import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

import { Endpoints } from '../lib/Endpoints';
import { Session } from 'meteor/session';


let defaultEndpoint = {
  "resourceType" : "Endpoint",
  "name" : [{
    "text" : "",
    "resourceType" : "HumanName"
  }],
  "active" : true,
  "gender" : "",
  "birthDate" : '',
  "photo" : [{
    url: ""
  }],
  identifier: [{
    "use": "usual",
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/v2/0203",
          "code": "MR"
        }
      ]
    },
    "value": ""
  }],
  "test" : false
};


Session.setDefault('endpointUpsert', false);
Session.setDefault('selectedEndpoint', false);

export default class EndpointDetail extends React.Component {
  getMeteorData() {
    let data = {
      endpointId: false,
      endpoint: defaultEndpoint
    };

    if (Session.get('endpointUpsert')) {
      data.endpoint = Session.get('endpointUpsert');
    } else {
      if (Session.get('selectedEndpoint')) {
        data.endpointId = Session.get('selectedEndpoint');
        console.log("selectedEndpoint", Session.get('selectedEndpoint'));

        let selectedEndpoint = Endpoints.findOne({_id: Session.get('selectedEndpoint')});
        console.log("selectedEndpoint", selectedEndpoint);

        if (selectedEndpoint) {
          data.endpoint = selectedEndpoint;

          if (typeof selectedEndpoint.birthDate === "object") {
            data.endpoint.birthDate = moment(selectedEndpoint.birthDate).add(1, 'day').format("YYYY-MM-DD");
          }
        }
      } else {
        data.endpoint = defaultEndpoint;
      }
    }

    if(process.env.NODE_ENV === "test") console.log("EndpointDetail[data]", data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="endpointDetail">
        <CardText>
          <TextField
            id='nameInput'
            ref='name'
            name='name'
            floatingLabelText='name'
            value={ get(this, 'data.endpoint.name[0].text', '')}
            onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='genderInput'
            ref='gender'
            name='gender'
            floatingLabelText='gender'
            hintText='male | female | other | indeterminate | unknown'
            value={ get(this, 'data.endpoint.gender', '')}
            onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='birthdateInput'
            ref='birthdate'
            name='birthdate'
            floatingLabelText='birthdate'
            hintText='YYYY-MM-DD'
            value={ get(this, 'data.endpoint.birthDate', '')}
            onChange={ this.changeState.bind(this, 'birthDate')}
            fullWidth
            /><br/>
          <TextField
            id='photoInput'
            ref='photo'
            name='photo'
            floatingLabelText='photo'
            value={ get(this, 'data.endpoint.photo[0].url', '')}
            onChange={ this.changeState.bind(this, 'photo')}
            floatingLabelFixed={false}
            fullWidth
            /><br/>
          <TextField
            id='mrnInput'
            ref='mrn'
            name='mrn'
            floatingLabelText='medical record number'
            value={ get(this, 'data.endpoint.identifier[0].value', '')}
            onChange={ this.changeState.bind(this, 'mrn')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.endpointId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(endpointId){
    if (endpointId) {
      return (
        <div>
          <RaisedButton id='saveEndpointButton' className='saveEndpointButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id='saveEndpointButton'  className='saveEndpointButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  changeState(field, event, value){
    let endpointUpdate;

    if(process.env.TRACE) console.log("endpointDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new endpoint
    if (Session.get('endpointUpsert')) {
      endpointUpdate = Session.get('endpointUpsert');
    } else {
      endpointUpdate = defaultEndpoint;
    }



    // if there's an existing endpoint, use them
    if (Session.get('selectedEndpoint')) {
      endpointUpdate = this.data.endpoint;
    }

    switch (field) {
      case "name":
        endpointUpdate.name[0].text = value;
        break;
      case "gender":
        endpointUpdate.gender = value.toLowerCase();
        break;
      case "birthDate":
        endpointUpdate.birthDate = value;
        break;
      case "photo":
        endpointUpdate.photo[0].url = value;
        break;
      case "mrn":
        endpointUpdate.identifier[0].value = value;
        break;
      default:

    }
    // endpointUpdate[field] = value;
    process.env.TRACE && console.log("endpointUpdate", endpointUpdate);

    Session.set('endpointUpsert', endpointUpdate);
  }


  // this could be a mixin
  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('handleSaveButton()');
    let endpointUpdate = Session.get('endpointUpsert', endpointUpdate);


    if (endpointUpdate.birthDate) {
      endpointUpdate.birthDate = new Date(endpointUpdate.birthDate);
    }
    if(process.env.NODE_ENV === "test") console.log("endpointUpdate", endpointUpdate);

    if (Session.get('selectedEndpoint')) {
      if(process.env.NODE_ENV === "test") console.log("Updating endpoint...");

      delete endpointUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      endpointUpdate.resourceType = 'Endpoint';

      Endpoints.update({_id: Session.get('selectedEndpoint')}, {$set: endpointUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Endpoints.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Endpoints", recordId: Session.get('selectedEndpoint')});
          // Session.set('endpointUpdate', defaultEndpoint);
          Session.set('endpointUpsert', false);
          Session.set('selectedEndpoint', false);
          Session.set('endpointPageTabIndex', 1);
          Bert.alert('Endpoint added!', 'success');
        }
      });
    } else {
      if(process.env.NODE_ENV === "test") console.log("Creating a new endpoint...", endpointUpdate);

      Endpoints.insert(endpointUpdate, function(error, result) {
        if (error) {
          if(process.env.NODE_ENV === "test")  console.log('Endpoints.insert[error]', error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Endpoints", recordId: result});
          Session.set('endpointPageTabIndex', 1);
          Session.set('selectedEndpoint', false);
          Session.set('endpointUpsert', false);
          Bert.alert('Endpoint added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('endpointPageTabIndex', 1);
  }

  handleDeleteButton(){
    Endpoints.remove({_id: Session.get('selectedEndpoint')}, function(error, result){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log('Endpoints.insert[error]', error);
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Endpoints", recordId: Session.get('selectedEndpoint')});
        // Session.set('endpointUpdate', defaultEndpoint);
        Session.set('endpointUpsert', false);
        Session.set('endpointPageTabIndex', 1);
        Session.set('selectedEndpoint', false);
        Bert.alert('Endpoint removed!', 'success');
      }
    });
  }
}


ReactMixin(EndpointDetail.prototype, ReactMeteorData);
