

Meteor.methods({
  createEndpoint:function(endpointObject){
    check(endpointObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Endpoint...');
      Endpoints.insert(endpointObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Endpoint created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeEndpoint:function(){
    if (Endpoints.find().count() === 0) {
      console.log("No records found in Endpoints collection.  Lets create some...");

      var defaultEndpoint = {
        name: {
          given: ["Gregory"],
          family: ["House"],
          text: "Dr. Gregory House, M.D."
        },
        telecom: [{
          system: 'phone',
          value: '212-555-2345',
          use: 'work',
          rank: '1'
        }]
      };

      Meteor.call('createEndpoint', defaultEndpoint);
    } else {
      console.log('Endpoints already exist.  Skipping.');
    }
  },
  dropEndpoints: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping endpoints... ');
      Endpoints.find().forEach(function(endpoint){
        Endpoints.remove({_id: endpoint._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
