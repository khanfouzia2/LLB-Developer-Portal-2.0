import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import Comment from './Comment.js';
import CommentCompose from './CommentCompose.js';
import { Link } from "react-router-dom"
import { GET_THREAD } from '../../rest-endpoints.js';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

class ThreadMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      threadObj: {
        title: "",
        content: "",
        comments: []
      }
    }
  }

  render() {


    const u = { id: 123, first_name: "Test", last_name: "Testing", }
    const meta = { color:'#ccc', fontSize:'0.8em', }
    // TODO error handling for empty objects/lists

    return(
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Thread</h2>
        </div>

        <div className="App-custom-page-content">
          <h3>{ this.state.threadObj.title }</h3>
          { this.state.threadObj.content }

          <div className="p-3" id="comments">
            <span id="comment-count" style={meta}>{this.state.threadObj.comments.length} comments, oldest first</span>
            { this.state.threadObj.comments.map((comment, i) => {
                return(<Comment id={comment.id} content={comment.content} userObj={comment.user} created_at={comment.created_at} key={comment.id} />);
            }) }
          </div>

          {/* Write a comment */}
          <CommentCompose thread_id={this.state.threadObj.id} />

        </div>

      </React.Fragment>
    );

  }

  /* Returns boolen true [default] if component should update itself */
  componentWillReceiveProps(newProps) {
    console.log( this.props );
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if(!helpers.isValidID(id)) {
      // Handle error!
      return;
    }

    const options = {
      method: 'GET',
      credentials: "include"
    }

    const r = new Request(GET_THREAD+'/'+id, options);

    fetch(r).then(data => {
      return data.json();
    }).then(data => {
      this.setState({
        threadObj: data
      })
      console.log(data)
    }).catch(err => {
      throw new Error("Thread not found in DB. Pleas insert some example data or check ID");
      console.log(err)
    })

    console.log("Did mount. Fetch Thread data from server... ID " + id)
  }


}
export default ThreadMain;
