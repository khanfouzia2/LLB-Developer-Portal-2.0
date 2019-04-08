import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import { Link } from "react-router-dom"
import { } from '../../rest-endpoints.js';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

class Comment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {

    const profileLink = { fontWeight:600 };
    const cmt = {
      display:'bclock',
      padding:'1.0em',
      backgroundColor:'rgb(229, 241, 252)',
      boxShadow:' 0.1em 0.1em 0.1em #9fb1c1',
      border:'1px solid rgb(175, 210, 226)',
    }
    const meta = {
      color:'#aaa',
      fontSize:'0.8em',
    }
    const cmtCont = {
      borderLeft:'2px solid #94b7d9',
    }

    return(
      <React.Fragment>
        <div className="row mt-1" id={this.props.id} style={cmt}>
          <div className="col-md-3">
            <Link to={`/user/${this.props.userObj.id}`} style={profileLink}> {helpers.getAuthorDetails(this.props.userObj)} </Link>
            <br/>
            <span style={meta} > { helpers.getDateFormatted(this.props.created_at) } </span>
            <span></span>
          </div>
          <div className="col-md-9" style={cmtCont}>
            <span>{this.props.content}</span>
          </div>
        </div>
      </React.Fragment>
    );

  }

  /* Returns boolen true [default] if component should update itself */
  componentWillReceiveProps(newProps) {
    // ...
  }




}

Comment.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  authorObj: PropTypes.node
}

export default Comment;
