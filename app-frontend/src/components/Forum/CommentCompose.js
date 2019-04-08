import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import { Link } from "react-router-dom"
import { } from '../../rest-endpoints.js';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

/*

  Component for commenting threads.
  Props:
    - thread_id : id of the Thread this comment is related to

*/
class CommentCompose extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return(
      <React.Fragment>
        Comment<br/>
        <textarea className="form-control"></textarea>
        <div className="mt-2">
          <button className="btn btn-primary btn-sm float-right" role="button" type="button">Comment</button>
        </div>
      </React.Fragment>
    );

  }

  componentWillReceiveProps(newProps) {
    // ...
  }




}

Comment.propTypes = {
  thread_id: PropTypes.number,
}

export default CommentCompose;
