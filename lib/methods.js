// import {epicEndpoints} from '../data/epic.json';
// import {cernerEndpoints} from '../data/cerner.json';

import { get } from 'lodash';

Meteor.methods({
  'Endpoint/initialize': function(){
    console.log('Endpoint/initialize')

    HTTP.get(Meteor.absoluteUrl() + 'packages/clinical_hl7-resource-endpoint/data/epic.json', function(err, result){
      console.log('Fetching dataset: ', Meteor.absoluteUrl() + 'data/epic.json');
      var entries = get(result, 'data.Entries');
      
      if(entries){
        entries.forEach(function(endpoint){
          // console.log('endpoint.OrganizationName', endpoint.OrganizationName);
          Meteor.call('Endpoint/create', endpoint);
        });
      }
    });


  },
  'Endpoint/create': async function(endpointData){
    console.log('Endpoint/create');

    check(endpointData, Object);

    var newEndpoint = {
      status: 'off',
      payloadType: [{
        coding: [{
          code: 'urn:ihe:pcc:xphr:2007'
        }],
        text: 'urn:ihe:pcc:xphr:2007'
      }],
      connectionType: {
        display: "FHIR Base",
        code: 'oauth'
      }, 
      name: endpointData.OrganizationName,
      address: endpointData.FHIRPatientFacingURI
    }

    if(endpointData.status){
      newEndpoint.status = endpointData.status;
    }
    if(endpointData.managingOrganization){
      newEndpoint.managingOrganization = endpointData.managingOrganization;
    }
    if(endpointData.contact){
      newEndpoint.contact = endpointData.contact;
    }

    console.log('Creating Endpoint...', newEndpoint);
    if(Meteor.isClient){
      Endpoints._collection.insert(newEndpoint, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Endpoint created: ' + result);
        }
      });  
    }
    if(Meteor.isServer){
      Endpoints.insert(newEndpoint, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Endpoint created: ' + result);
        }
      });  
    }
  },
  'Endpoint/drop': function(){
      console.log('-----------------------------------------');
      console.log('Endpoint/drop');

      Endpoints.remove({});
    }
});
