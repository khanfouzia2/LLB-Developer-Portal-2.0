import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import ForumThreadInfoBox from './ForumThreadInfoBox.js';
import ThreadCompose from './ThreadCompose.js';
import AuthContext from '../../context/auth-context';
import { FORUM_GET_RECENT } from '../../rest-endpoints.js';
import { Link } from "react-router-dom"
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

/*

  Component for Forum main view

*/
class ForumMain extends React.Component {

  static contextType = AuthContext;


  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      threads: [],
      showComposeNewPost: false,
    }


    this.handleClickCreateNewThread = this.handleClickCreateNewThread.bind(this);
    this.handleLoadMoreThreads = this.handleLoadMoreThreads.bind(this);
    this.handleCancelCompose = this.handleCancelCompose.bind(this);
  }

  render() {

    const metaText = { color:'#aaa', fontSize:'0.8em', }

    return(
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Forum</h2>
        </div>
        <div className="App-custom-page-content">

          { this.renderComposeNewPost() }

          {/* Content section */}
          <div className="container">

            <div>
              <h2 style={{marginBottom:0,}}>Threads</h2>
            </div>

            <span className="" style={metaText}>Most recent first</span>
            {this.state.threads.map((thr, index) => (
              <ForumThreadInfoBox threadObj={thr} key={thr.id} />
            ))}
            <div className="mt-3">
              <button onClick={(e)=>this.handleLoadMoreThreads(e)} type="button" className="btn btn-outline-primary btn-block">Load more threads</button>
            </div>
          </div>

        </div>
      </React.Fragment>
    )

  }



  /* Only render if user is logged in */
  renderComposeNewPost() {
    const {id, isAuth} = this.context;

    var composeNewPost;
    if(this.state.showComposeNewPost == true) {
      composeNewPost = <ThreadCompose onCancelFunction={this.handleCancelCompose} />;
    } else {
      composeNewPost = null;
    }


    if(isAuth === true) {
      return(
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              {/* Show button if compose-component is not visible */}
              {!this.state.showComposeNewPost &&
                <button className="btn btn-primary" onClick={(e)=>this.handleClickCreateNewThread(e)}>Create new thread</button>
              }
              { composeNewPost }
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div className="container mb-5">
          <Link to="/" className="">Register or sign up to create a thread</Link>
        </div>
      );
    }
  }

  componentWillMount() {
  }

  /*
    After successfull mounting, fetch data from server
  */
  componentDidMount() {
    this.fetchRecentThreads();
  }

  fetchRecentThreads(page=1) {

    const options = {
      method: "GET",
      credentials: "include",
    }

    var r = new Request(FORUM_GET_RECENT+'?page='+page, options);

    // Call
    fetch(r).then(data => {
      return data.json();
      console.log(data);
    }).then(threads => {

      var extended = this.state.threads.concat(threads);

      this.setState({
        threads: extended
      }, () => {
        // update page count. Already raised by 1. see above.
        this.setState({page: this.state.page+1});
        console.log("State updated!")
      } )

    }).catch(err => {
      console.log(err);
    })

  }


  handleLoadMoreThreads(e) {
    console.log("onClick event received!");

    e.target.disabled = true;
    e.target.setAttribute('style', 'cursor:wait;');

    setInterval((btn) => {
      btn.disabled = false;
      btn.style.removeProperty('cursor');
    }, 1000, e.target)

    var p = this.state.page+1;
    this.fetchRecentThreads(p);
  }

  handleClickCreateNewThread(e) {
    console.log("User clicked New Thread -button");

    this.setState({
      showComposeNewPost: true
    });

  }

  handleCancelCompose() {
    this.setState({
      showComposeNewPost: false
    });
  }

}
export default ForumMain;
