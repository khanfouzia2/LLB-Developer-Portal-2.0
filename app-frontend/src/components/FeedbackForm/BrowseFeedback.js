import React, { Component } from 'react';
import { FEEDBACK_TITLE_MAXLEN } from '../../config.js';
import { FEEDBACK_GET } from '../../rest-endpoints.js';
import Alert from '../Misc/Alert.js';
import Context from '../../context/auth-context';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');
var sanitizeHtml = require('sanitize-html');

/*
  View for admin to browse recieved feedbacks.
*/
class BrowseFeedback extends Component {

    static contextType = Context;

    constructor(props) {
        super(props);

        this.state = {
          feedbacks: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }



  render() {

    const { isAuth } = this.context;
    if(!isAuth) {
      return(null);
    }

    var feedbacks = this.state.feedbacks.map((fb, i) => {
      return(
        <div className="card" data-id={fb.id}>
          <div className="card-header">
            <span>{fb.title}</span>
          </div>
          <div className="card-body">
            <span>Content: </span>
            <span>{fb.description}</span>
            <hr/>
            <span className="metatext">Sender: {helpers.getAuthorDetails(fb.user)} ({ fb.user.email })</span>
          </div>
        </div>
      )
    });

    return (
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Feedbacks</h2>
        </div>

        <div className="App-custom-page-content">
          <div className="alert alert-warning">Under construction!</div>
          { feedbacks }
        </div>
      </React.Fragment>
    );
  }



  componentDidMount() {
    console.log("Component did mount!");
    this.fetchFeedbacks(99);
  }

  fetchFeedbacks(page=1) {

    console.log("fetchFeedbacks() called with param: " + page);

    var headers = new Headers();
    headers.append('Content-Type','application/json');
    const opts = {
      method: "GET",
      headers: headers,
      credentials: "include"
    }

    var r = new Request(FEEDBACK_GET, opts);

    var prom = fetch(r);
    prom.then(res => {
      if(res.status == 200) {
        return res.json()
      } else {
        throw new Error();
      }
    }, (err) => {
      alert(err);
    }).then(data => {
      console.log( data );
      // append
      this.setState({
        feedbacks: [...this.state.feedbacks, ...data]
      })
    });

  }


  /* Generic method for changing form-values */
  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
  }




}

export default BrowseFeedback;
