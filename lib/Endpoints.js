if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited."); 
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");  
  console.log("");  
  console.log("meteor remove clinical:autopublish");  
  console.log("");  
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}




// create the object using our BaseModel
Endpoint = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Endpoint.prototype._collection = Endpoints;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Endpoints = new Mongo.Collection('HL7.Resources.Endpoints');
Endpoints = new Mongo.Collection('Endpoints');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Endpoints._transform = function (document) {
  return new Endpoint(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Endpoints");
}

if (Meteor.isServer){
  Meteor.publish("Endpoints", function (argument){

    if (!query) {
      query = {};
    }

    var options = {
      sort: {}
    };

    options.sort["meta.lastUpdated"] = -1;

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.subscriptionLimit) {
      options.limit = Meteor.settings.public.defaults.subscriptionLimit;
    }

    process.env.DEBUG && console.log("Endpoints.publication", query, options);

    // user is logged in
    if (this.userId) {
      return Endpoints.find(query, options);
    } else {
      return [];
    }

  });
}



EndpointSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "Endpoint"
  },
  "identifier" : {
    optiona: true,
    type: [ Identifier ]
  }, 
  "status" : {
    optiona: true,
    type: String
  }, 
  "connectionType" : {
    optiona: true,
    type: Coding 
  }, 
  "name" : {
    optiona: true,
    type: String
  }, 
  "managingOrganization" : {
    optiona: true,
    type: Reference 
  }, 
  "contact" : {
    optiona: true,
    type: [ ContactPoint ]
  }, 
  "period" : {
    optiona: true,
    type: Period 
  }, 
  "payloadType" : {
    optiona: true,
    type: [ CodeableConcept ]
  }, 
  "payloadMimeType" : {
    optiona: true,
    type: [ String ]
  }, 
  "address" : {
    optiona: true,
    type: String
  }, 
  "header" : {
    optiona: true,
    type: [ String ] 
  }
}]);
Endpoints.attachSchema(EndpointSchema);



/**
 * @summary The displayed name of the endpoint.
 * @memberOf Endpoint
 * @name displayName
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

Endpoint.prototype.displayName = function () {
  if (this.name) {
    return this.name.text;
  }
};



/**
 * @summary The displayed Meteor.userId() of the endpoint.
 * @memberOf Endpoint
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

Endpoint.prototype.userId = function () {
  var result = null;
  if (this.extension) {
    this.extension.forEach(function(extension){
      if (extension.url === "Meteor.userId()") {
        result = extension.valueString;
      }
    });
  }
  return result;
};



//=================================================================


Endpoints.fetchBundle = function (query, parameters, callback) {
  var endpointArray = Endpoints.find(query, parameters, callback).map(function(endpoint){
    endpoint.id = endpoint._id;
    delete endpoint._document;
    return endpoint;
  });

  // console.log("endpointArray", endpointArray);

  var result = Bundle.generate(endpointArray);

  // console.log("result", result.entry[0]);

  return result;
};


/**
 * @summary This function takes a FHIR resource and prepares it for storage in Mongo.
 * @memberOf Endpoints
 * @name toMongo
 * @version 1.6.0
 * @returns { Endpoint }
 * @example
 * ```js
 *  let endpoints = Endpoints.toMongo('12345').fetch();
 * ```
 */

Endpoints.toMongo = function (originalEndpoint) {
  var mongoRecord;
  process.env.TRACE && console.log('Endpoints.toMongo', originalEndpoint);


  if (originalEndpoint.identifier) {
    originalEndpoint.identifier.forEach(function(identifier){
      if (identifier.period) {
        if (identifier.period.start) {
          var startArray = identifier.period.start.split('-');
          identifier.period.start = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
        if (identifier.period.end) {
          var endArray = identifier.period.end.split('-');
          identifier.period.end = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
      }
    });
  }

  if (originalEndpoint.birthDate) {
    var birthdateArray = originalEndpoint.birthDate.split('-');
    originalEndpoint.birthDate = new Date(birthdateArray[0], birthdateArray[1] - 1, birthdateArray[2]);
  }


  return originalEndpoint;
};


/**
 * @summary Similar to toMongo(), this function prepares a FHIR record for storage in the Mongo database.  The difference being, that this assumes there is already an existing record.
 * @memberOf Endpoints
 * @name prepForUpdate
 * @version 1.6.0
 * @returns { Object }
 * @example
 * ```js
 *  let endpoints = Endpoints.findMrn('12345').fetch();
 * ```
 */

Endpoints.prepForUpdate = function (endpoint) {

  if (endpoint.name && endpoint.name[0]) {
    //console.log("endpoint.name", endpoint.name);

    endpoint.name.forEach(function(name){
      name.resourceType = "HumanName";
    });
  }

  if (endpoint.telecom && endpoint.telecom[0]) {
    //console.log("endpoint.telecom", endpoint.telecom);
    endpoint.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }

  if (endpoint.address && endpoint.address[0]) {
    //console.log("endpoint.address", endpoint.address);
    endpoint.address.forEach(function(address){
      address.resourceType = "Address";
    });
  }

  if (endpoint.contact && endpoint.contact[0]) {
    //console.log("endpoint.contact", endpoint.contact);

    endpoint.contact.forEach(function(contact){
      if (contact.name) {
        contact.name.resourceType = "HumanName";
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          telecom.resourceType = "ContactPoint";
        });
      }

    });
  }

  return endpoint;
};


/**
 * @summary Scrubbing the endpoint; make sure it conforms to v1.6.0
 * @memberOf Endpoints
 * @name scrub
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let endpoints = Endpoints.findMrn('12345').fetch();
 * ```
 */

Endpoints.prepForFhirTransfer = function (endpoint) {
  //console.log("Endpoints.prepForBundle()");


  // FHIR has complicated and unusual rules about dates in order
  // to support situations where a family member might report on a endpoint's
  // date of birth, but not know the year of birth; and the other way around
  if (endpoint.birthDate) {
    endpoint.birthDate = moment(endpoint.birthDate).format("YYYY-MM-DD");
  }


  if (endpoint.name && endpoint.name[0]) {
    //console.log("endpoint.name", endpoint.name);

    endpoint.name.forEach(function(name){
      delete name.resourceType;
    });
  }

  if (endpoint.telecom && endpoint.telecom[0]) {
    //console.log("endpoint.telecom", endpoint.telecom);
    endpoint.telecom.forEach(function(telecom){
      delete telecom.resourceType;
    });
  }

  if (endpoint.address && endpoint.address[0]) {
    //console.log("endpoint.address", endpoint.address);
    endpoint.address.forEach(function(address){
      delete address.resourceType;
    });
  }

  if (endpoint.contact && endpoint.contact[0]) {
    //console.log("endpoint.contact", endpoint.contact);

    endpoint.contact.forEach(function(contact){

      console.log("contact", contact);


      if (contact.name && contact.name.resourceType) {
        //console.log("endpoint.contact.name", contact.name);
        delete contact.name.resourceType;
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          delete telecom.resourceType;
        });
      }

    });
  }

  //console.log("Endpoints.prepForBundle()", endpoint);

  return endpoint;
};

/**
 * @summary The displayed name of the endpoint.
 * @memberOf Endpoint
 * @name displayName
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

Endpoint.prototype.displayName = function () {
  if (this.name && this.name[0]) {
    return this.name[0].text;
  }
};
