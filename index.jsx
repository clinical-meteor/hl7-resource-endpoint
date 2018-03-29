
import EndpointsPage from './client/EndpointsPage';
import EndpointsTable from './client/EndpointsTable';

import { Endpoint, Endpoints, EndpointSchema } from './lib/Endpoints';

var DynamicRoutes = [{
  'name': 'EndpointPage',
  'path': '/endpoints',
  'component': EndpointsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Endpoints',
  'to': '/endpoints',
  'href': '/endpoints'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  EndpointsPage,
  EndpointsTable
};


