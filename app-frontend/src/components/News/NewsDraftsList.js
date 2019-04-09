import React, {Component} from 'react';
import { Link } from "react-router-dom"
import { NEWS_GET_DRAFTS} from '../../rest-endpoints';
import  * as config from '../../config.js';
const helpers = require('../../helpers.js');

class NewsDraftsList extends Component {


    constructor(props) {
      super(props);

      this.state = {
        newsObjs: []
      }
    }

    render() {


      var x = this.state.newsObjs.map(news =>
        <li class="list-group-item">
          <Link to={`/news/compose?edit_id=${news.id}`}>{news.title ? helpers.niceSubstr(news.title, 25) : "ID: "+news.id}</Link>
          <br/><small className="text-muted">{helpers.getDateFormatted(news.created_at)}</small>
        </li>
      )

      return(
        <div className="card">
          <div className="card-header">Drafts / not visible news</div>
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

      var req = new Request(NEWS_GET_DRAFTS, {
        method: "GET",
        credentials: "include"
      });

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




  }
  export default NewsDraftsList;
