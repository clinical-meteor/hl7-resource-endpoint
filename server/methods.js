

Meteor.methods({
  createEndpoint: function(endpointData){
    console.log('createEndpoint')
    check(endpointData, Object);

    var newEndpoint = {
      status: 'off',
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

    console.log('Creating Endpoint...');
    Endpoints.insert(newEndpoint, function(error, result){
      if (error) {
        console.log(error);
      }
      if (result) {
        console.log('Endpoint created: ' + result);
      }
    });
  },
  dropEndpoints: function(){
      console.log('-----------------------------------------');
      console.log('Dropping endpoints... ');
      Endpoints.remove({});
    }
});
