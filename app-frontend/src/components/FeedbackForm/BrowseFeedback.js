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
          page: 1,
          feedbacks: [],
          alert: {
            isShown: false,
            content: "",
            style: ""
          }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoadMoreFeedbacks = this.handleLoadMoreFeedbacks.bind(this);
    }



  render() {

    const { isAuth } = this.context;
    if(!isAuth) {
      return(null);
    }

    var feedbacks = this.state.feedbacks.map((fb, i) => {
      return(
        <div className="card mb-1" data-id={fb.id} key={fb.id}>
          <div className="card-header">
            <span>{fb.title}</span>
          </div>
          <div className="card-body">
            <span>Content: </span>
            <span>{fb.description}</span>
            <hr/>
            <span className="metatext">
              Sender: {helpers.getAuthorDetails(fb.user)} ({ fb.user.email })<br/>
              Sent: { fb.created_at ? helpers.getDateFormatted(fb.created_at) : "Unknown time (timestamp missing)"}
              <br/>
              ID: {fb.id}<br/>
            </span>
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
          <div>
            {/* Alert 0 */}
            <Alert isShown={this.state.alert.isShown} content={this.state.alert.content} style={this.state.alert.style} />
            <div id="feedback-list">
              { feedbacks }
            </div>

            <div className="mt-3">
              <button className="btn btn-block btn-outline-primary" onClick={(e)=>this.handleLoadMoreFeedbacks(e)}>Load more feedbacks</button>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }



  componentDidMount() {
    console.log("Component did mount!");
    this.fetchFeedbacks(1);
  }

  /*
    When user clics 'load more fbs'
  */
  handleLoadMoreFeedbacks(e) {

    var btn = e.target;
    btn.disabled = true;
    setInterval(function(btn) {
      btn.disabled=false;
    }, 1500, btn);

    // Make request and get feedbacks
    this.fetchFeedbacks(this.state.page+1)

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

    var r = new Request(FEEDBACK_GET+'?page='+page, opts);

    var prom = fetch(r);
    prom.then(res => {


      if(res.ok) {
        return res.json()
      } else {
        throw new Error(res.message);
      }

    }, (err) => {
      // If request itself fails (not the same as request with not valid response)
      alert(err);
    }).then(data => {

      console.log( data );
      // append + callback
      this.setState({
        feedbacks: [...this.state.feedbacks, ...data]
      }, () => { this.setState({page: this.state.page+1}); })

    }, (err) => {
      console.log(err)
      this.setState({ alert: { isShown:true, content: "Load request failed!", style:"warning" } })
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
