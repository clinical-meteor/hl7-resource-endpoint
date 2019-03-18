import { FlatButton, Toggle } from 'material-ui';
import { HTTP } from 'meteor/http';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

//import { Endpoints } from '../../lib/Endpoints';
import { Session } from 'meteor/session';
import { has, get } from 'lodash';
import { TableNoData } from 'meteor/clinical:glass-ui';

export class EndpointTable extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        },
        cellHideOnPhone: {
          visibility: 'visible',
          display: 'table',
          paddingTop: '16px'
        },
        cell: {
          paddingTop: '16px'
        }
      },
      selected: [],
      endpoint: []
    };

    let query = {};
    if(this.props.patient){
      query['patient.display'] = this.props.patient;
    }

    let options = {};
    // number of items in the table should be set globally
    if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
      options.limit = get(Meteor, 'settings.public.defaults.paginationLimit');
    }

    // but can be over-ridden by props being more explicit
    if(this.props.limit){
      options.limit = this.props.limit;      
    }


    data.endpoint = Endpoints.find(query, options).map(function(document){
      let result = {
        _id: document._id,
        status: get(document, 'status', ''),
        name: get(document, 'name', ''),
        address: get(document, 'address', ''),
        // start: get(document, 'period.start', ''),
        // end: get(document, 'period.end', '')
      };
      return result;
    });

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
      data.style.cellHideOnPhone.visibility = 'hidden';
      data.style.cellHideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
      data.style.cellHideOnPhone.visibility = 'visible';
      data.style.cellHideOnPhone.display = 'table-cell';
    }

    return data;
  }
  rowClick(id){
    Session.set('endpointUpsert', false);
    Session.set('selectedEndpoint', id);
    Session.set('subscriptionPageTabIndex', 2);
  }
  toggleEndpointStatus(){
    console.log('toggleEndpointStatus')
  }
  render () {
    let tableRows = [];
    let footer;

    if(this.data.endpoint.length === 0){
      // don't try to simplifiy the double negative in this expression
      // it's handling a boolean property, and also serving up instructions/help/warning
      // it's klunky to reason through; but it's not hurting anything
      if(!(this.props.noDataMessage === false)){
        footer = <TableNoData />
      }
    } else {
      for (var i = 0; i < this.data.endpoint.length; i++) {
        tableRows.push(
          <tr key={i} className="subscriptionRow" style={{cursor: "pointer"}}>
  
            <td className='status' style={this.data.style.cell}>
              <Toggle onToggle={this.toggleEndpointStatus.bind(this, this.data.endpoint[i]._id) } toggled={get(this, 'data.endpoint[i].status')} />
            </td>
            <td className='name' onClick={ this.rowClick.bind('this', this.data.endpoint[i]._id)} style={this.data.style.cell} >{this.data.endpoint[i].name }</td>
            <td className='address' onClick={ this.rowClick.bind('this', this.data.endpoint[i]._id)} style={this.data.style.cell} >{this.data.endpoint[i].address}</td>
          </tr>
        );
      }  
    }

    return(
      <div>
        <Table id='endpointTable' hover >
        <thead>
          <tr>
            <th className='status'>status</th>
            <th className='name'>name</th>
            <th className='address' >address</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
      { footer }
      </div>
    );
  }
}


ReactMixin(EndpointTable.prototype, ReactMeteorData);
export default EndpointTable;