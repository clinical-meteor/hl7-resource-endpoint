Package.describe({
  name: 'clinical:hl7-resource-endpoint',
  version: '3.0.16',
  summary: 'HL7 FHIR Resource - Endpoint',
  git: 'https://github.com/clinical-meteor/hl7-resource-endpoint',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('simple:json-routes@2.1.0');
  api.use('momentjs:moment@2.17.1');
  api.use('ecmascript@0.9.0');
  api.use('session');
  api.use('http');
  api.use('react-meteor-data@0.2.15');

  api.use('clinical:glass-ui@2.2.4');
  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@3.0.1');
  api.use('clinical:hl7-resource-bundle@1.3.14');
  api.use('clinical:alert@2.1.3');

  api.addFiles('lib/Endpoints.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/methods.js', 'server');

  if(Package['clinical:fhir-vault-server']){
    api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  }

  api.export('Endpoint');
  api.export('Endpoints');
  api.export('EndpointSchema');

  api.mainModule('index.jsx', 'client');
});
