import React, {Component} from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

import { NEWS_GET_DRAFTS} from '../../rest-endpoints';
import  * as config from '../../config.js';
const helpers = require('../../helpers.js');

class NewsDraftsList extends Component {


    constructor(props) {
      super(props);

      this.state = {
        //newsObjs: []
      }
    }

    render() {


      var x = this.props.drafts.map(drafts =>
        <li class="list-group-item">
          <Link to={`/news/compose?edit_id=${drafts.id}`}>{drafts.title ? helpers.niceSubstr(drafts.title, 25) : "ID: "+drafts.id}</Link>
          <br/><small className="text-muted">{helpers.getDateFormatted(drafts.created_at)}</small>
        </li>
      )

      return(
        <div className="card">
          <div className="card-header">
            <strong>Drafts</strong>
            <span className="float-right metatext">not visible</span>
          </div>
          <ul class="list-group list-group-flush">
            { x }
          </ul>
        </div>
      );


    }


    /*
      When component is loaded, get drafts from back-end
    */
    componentWillMount() {

      console.log("Drafts componen will mount...");
      //this.loadDraftsAndUpdateState();

    }

    /*
    loadDraftsAndUpdateState() {
      var req = new Request(NEWS_GET_DRAFTS, {
        method: "GET",
        credentials: "include"
      });

      console.log("Fetching drafts from back end...");
      fetch(req).then(data => {
        return data.json()
      }).then(data => {
        this.setState({
          newsObjs: data
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
    */



  }
  export default NewsDraftsList;

  NewsDraftsList.propTypes = {
    drafts: PropTypes.array
  }
