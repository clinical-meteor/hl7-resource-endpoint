
import EndpointsPage from './client/EndpointsPage';
import EndpointsTable from './client/EndpointsTable';

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


