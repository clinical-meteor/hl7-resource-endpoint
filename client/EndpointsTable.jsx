
import { 
  CssBaseline,
  Grid, 
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Tab, 
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch
} from '@material-ui/core';



// import { FlatButton, Toggle } from 'material-ui';
// import { Table } from 'react-bootstrap';
import { HTTP } from 'meteor/http';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

//import { Endpoints } from '../../lib/Endpoints';
import { Session } from 'meteor/session';
import { has, get } from 'lodash';
// import { TableNoData } from 'meteor/clinical:glass-ui';

// export class EndpointTable extends React.Component {
//   getMeteorData() {
//     let data = {
//       style: {
//         hideOnPhone: {
//           visibility: 'visible',
//           display: 'table'
//         },
//         cellHideOnPhone: {
//           visibility: 'visible',
//           display: 'table',
//           paddingTop: '16px'
//         },
//         cell: {
//           paddingTop: '16px'
//         }
//       },
//       selected: [],
//       endpoint: []
//     };

//     let query = {};
//     if(this.props.patient){
//       query['patient.display'] = this.props.patient;
//     }

//     let options = {};
//     // number of items in the table should be set globally
//     if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
//       options.limit = get(Meteor, 'settings.public.defaults.paginationLimit');
//     }

//     // but can be over-ridden by props being more explicit
//     if(this.props.limit){
//       options.limit = this.props.limit;      
//     }


//     data.endpoint = Endpoints.find(query, options).map(function(document){
//       let result = {
//         _id: document._id,
//         status: get(document, 'status', ''),
//         name: get(document, 'name', ''),
//         address: get(document, 'address', ''),
//         // start: get(document, 'period.start', ''),
//         // end: get(document, 'period.end', '')
//       };
//       return result;
//     });

//     if (Session.get('appWidth') < 768) {
//       data.style.hideOnPhone.visibility = 'hidden';
//       data.style.hideOnPhone.display = 'none';
//       data.style.cellHideOnPhone.visibility = 'hidden';
//       data.style.cellHideOnPhone.display = 'none';
//     } else {
//       data.style.hideOnPhone.visibility = 'visible';
//       data.style.hideOnPhone.display = 'table-cell';
//       data.style.cellHideOnPhone.visibility = 'visible';
//       data.style.cellHideOnPhone.display = 'table-cell';
//     }

//     return data;
//   }
// }


function EndpointTable(props){


  function flattenEndpoint(encounter){
    let result = {
      _id: '',
      name: '',
      status: '',
      address: ''
    };
    
    switch (get(encounter, 'status', 'inactive')) {
      case 'active':
        result.status = false;
        break;
      case 'inactive':
        result.status = true;        
        break;      
      default:
        break;
    }

    result.name = get(encounter, 'name', '');
    result.address = get(encounter, 'address', '');

    return result;
  }

  function rowClick(id){
    Session.set('endpointUpsert', false);
    Session.set('selectedEndpoint', id);
    Session.set('subscriptionPageTabIndex', 1);
  }
  function toggleEndpointStatus(){
    console.log('toggleEndpointStatus')
  }

  let tableRows = [];
  let endpointsToRender = [];
  if(props.endpoints){
    if(props.endpoints.length > 0){              
      props.endpoints.forEach(function(encounter){
        endpointsToRender.push(flattenEndpoint(encounter));
      });  
    }
  }

  if(endpointsToRender.length === 0){
    console.log('No endpoints to render');
    // footer = <TableNoData noDataPadding={ props.noDataMessagePadding } />
  } else {
    for (var i = 0; i < endpointsToRender.length; i++) {
      if(props.multiline){
        tableRows.push(
          <TableRow className="encounterRow" key={i} onClick={ rowClick(endpointsToRender[i]._id)} >
            <TableCell className='status' >
              <Switch onChange={ toggleEndpointStatus(endpointsToRender[i]._id) } checked={get(this, 'data.endpoint[i].status')} />
            </TableCell>
            <TableCell className='name' onClick={ rowClick(endpointsToRender[i]._id)} >{endpointsToRender[i].name }</TableCell>
            <TableCell className='address' onClick={ rowClick(endpointsToRender[i]._id)} >{endpointsToRender[i].address}</TableCell>

          </TableRow>
        );    

      } else {
        tableRows.push(
          <TableRow className="encounterRow" key={i} onClick={ rowClick(endpointsToRender[i]._id)} >            
            <TableCell className='status' >
              <Switch onChange={ toggleEndpointStatus(endpointsToRender[i]._id) } checked={get(this, 'data.endpoint[i].status')} />
            </TableCell>
            <TableCell className='name' onClick={ rowClick(endpointsToRender[i]._id)}  >{endpointsToRender[i].name }</TableCell>
            <TableCell className='address' onClick={ rowClick(endpointsToRender[i]._id)}  >{endpointsToRender[i].address}</TableCell>

          </TableRow>
        );    
      }
    }
  }

  return(
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell className='status'>Status</TableCell>
          <TableCell className='name'>Name</TableCell>
          <TableCell className='address' >Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { tableRows }
      </TableBody>
    </Table>
  );
}

// ReactMixin(EndpointTable.prototype, ReactMeteorData);
export default EndpointTable;