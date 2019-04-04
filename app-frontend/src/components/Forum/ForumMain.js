import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import ForumThreadInfoBox from './ForumThreadInfoBox.js';
import ThreadCompose from './ThreadCompose.js';
//import { } from '../../rest-endpoints.js';
import { Link } from "react-router-dom"
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

/*

  Component for Forum main view

*/
class ForumMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComposeNewPost: false
    }


    this.handleClickCreateNewThread = this.handleClickCreateNewThread.bind(this);
  }

  render() {

    const metaText = { color:'#aaa', fontSize:'0.8em', }

    var composeNewPost;
    if(this.state.showComposeNewPost) {
      composeNewPost = <ThreadCompose />;
    } else {
      composeNewPost = null;
    }

    return(
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Forum</h2>
        </div>
        <div className="App-custom-page-content">


          <div className="container">

            {/* Top row */}
            <div className="row">
              <div className="col-md-12">
                {/* Show button if compose-component is not visible */}
                {!this.state.showComposeNewPost &&
                  <button className="btn btn-primary" onClick={(e)=>this.handleClickCreateNewThread(e)}>Create new thread</button>
                }
                { composeNewPost }
              </div>
            </div>

          </div>

          {/* Content section */}
          <div className="container">

            <div>
              <h2>Threads</h2>
            </div>

            <span className="" style={metaText}>Most recent first</span>
            <ForumThreadInfoBox threadObj={{title:"Oulu API will be available in 2020", content:"Just kidding!"}} key="123" />
            <ForumThreadInfoBox threadObj={{title:"One trillion API Requests!", content: helpers.getLorem(600) }} key="12453" />
            <ForumThreadInfoBox threadObj={{title:"One trillion API Requests!", content: helpers.getLorem(600) }} key="" />
            <ForumThreadInfoBox threadObj={{title:"One trillion API Requests!", content: helpers.getLorem(100) }} key="" />
            <ForumThreadInfoBox threadObj={{title:"One trillion API Requests!", content: helpers.getLorem(50) }} key="" />
            <ForumThreadInfoBox threadObj={{title:"One trillion API Requests!", content: helpers.getLorem(600) }} key="" />
          </div>

        </div>
      </React.Fragment>
    )

  }


  handleClickCreateNewThread(e) {
    console.log("User clicked New Thread -button");

    this.setState({
      showComposeNewPost: true
    });

  }

}
export default ForumMain;
