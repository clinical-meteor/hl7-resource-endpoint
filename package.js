Package.describe({
  name: 'clinical:hl7-resource-endpoint',
  version: '3.1.4',
  summary: 'HL7 FHIR Resource - Endpoint',
  git: 'https://github.com/clinical-meteor/hl7-resource-endpoint',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');

  api.use('aldeed:collection2@3.0.0');
  api.use('clinical:hl7-resource-datatypes@4.0.0');
  api.use('clinical:hl7-resource-bundle@1.4.0');

  api.use('simple:json-routes@2.1.0');
  api.use('momentjs:moment@2.17.1');
  api.use('ecmascript@0.9.0');
  api.use('session');
  api.use('http');
  api.use('react-meteor-data@0.2.15');

  api.use('clinical:glass-ui@2.4.6');
  api.use('clinical:base-model@1.4.0');
  api.use('clinical:alert@2.1.3');

  api.addFiles('lib/Endpoints.js', ['client', 'server']);
  api.addFiles('lib/methods.js', ['client', 'server']);

  api.addFiles('server/rest.js', 'server');

  if(Package['clinical:fhir-vault-server']){
    api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  }

  api.addFiles('data/epic.json', ['client', 'server'], {isAsset: true});
  api.addFiles('data/cerner.json', ['client', 'server'], {isAsset: true});

  api.export('Endpoint');
  api.export('Endpoints');
  api.export('EndpointSchema');

  api.mainModule('index.jsx', 'client');
});


Npm.depends({
  "simpl-schema": "1.5.3",
  "moment": "2.22.2",
  "lodash": "4.17.4"
})