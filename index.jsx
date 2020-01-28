import React from 'react';

import EndpointsPage from './client/EndpointsPage';
import EndpointTable from './client/EndpointTable';

import { AiOutlineApi, AiOutlineCluster, AiOutlineShareAlt } from 'react-icons/ai';

var DynamicRoutes = [{
  'name': 'EndpointPage',
  'path': '/endpoints',
  'component': EndpointsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Endpoints',
  'to': '/endpoints',
  'href': '/endpoints',
  'icon': <AiOutlineShareAlt />
}];
var AdminSidebarElements = [{
  'primaryText': 'Endpoints',
  'to': '/endpoints',
  'href': '/endpoints',
  'icon': <AiOutlineShareAlt />
}];

export { 
  AdminSidebarElements,
  SidebarElements, 
  DynamicRoutes, 

  EndpointsPage,
  EndpointTable
};


