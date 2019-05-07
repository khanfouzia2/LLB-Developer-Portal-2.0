import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import './forum.css';
import AuthContext from '../../context/auth-context';
import { Link } from "react-router-dom"
import { COMMENT_DELETE, COMMENT_DELETE_DONE_STATUS } from '../../rest-endpoints.js';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');
var sanitizeHtml = require('sanitize-html');

class Comment extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);


    this.state = {
      modal: {
        isShown: false,
        title: "",
        content: "",
        onCloseFunction: null,
        closeButtonText: "",
        closeButtonStyle: "",
        buttonText: "",
      }
    }

    this.handleDelete     = this.handleDelete.bind(this);
    this.makeDeleteCall   = this.makeDeleteCall.bind(this);
  }

  render() {

    const profileLink = { fontWeight:600 };

    var adminBadge = null;
    if(this.props.userObj.role === config.ADMIN_ROLE_NAME) {
      adminBadge = <span title="User badge" className="badge badge-warning">ADMIN</span>
    }

    return(
      <React.Fragment>
        <div className="row comment" id={`comment-${this.props.id}`}>
          <div className="col-md-3 pl-0 comment-left">
            {/*<Link to={`/user/${this.props.userObj.id}`} style={profileLink}> {helpers.getAuthorDetails(this.props.userObj)} </Link> */}
            <span> {helpers.getAuthorDetails(this.props.userObj)} </span>
            { adminBadge }
            <br/>
            <div><span className="metatext"> { helpers.getDateFormatted(this.props.created_at) }</span></div>
            <div>
              <span title="Comment ID" className="badge badge-secondary">#{this.props.id} </span>
            </div>
            { this.renderDeleteLink() }
          </div>
          <div className="col-md-9">
            <span className="comment-content" dangerouslySetInnerHTML={ helpers.getSanitizedContent(this.props.content)}></span>
          </div>
        </div>

        <Modal
          isShown={this.state.modal.isShown}
          onCloseFunction={this.state.modal.onCloseFunction}
          title={this.state.modal.title}
          closeButtonText={this.state.modal.closeButtonText}
          closeButtonStyle={this.state.modal.closeButtonStyle}
          extraButtons={this.state.modal.extraButtons}
        />

      </React.Fragment>
    );

  }

  componentDidMount() {
  }

  /* Returns boolen true [default] if component should update itself */
  componentWillReceiveProps(newProps) {
    // ...
  }


  /*
   Triggered when user clicks 'delete comment'.
   Opens Modal with confirmation.
  */
  handleDelete(e) {
    console.log("User clicked Delete. Open modal window.")

    const ebs = [
      <button onClick={(e)=>{ this.setState({ modal: { isShown: false }}) }} className="btn btn-outline-secondary">Cancel</button>
    ]
    this.setState({ modal: { isShown: true, title: "Do you really want to delete this comment?", onCloseFunction: this.makeDeleteCall, closeButtonStyle: "danger", closeButtonText: "DELETE", extraButtons: ebs } })
  }


  makeDeleteCall() {

    const options = {
      method: "DELETE",
      credentials: "include"
    };

    var r = new Request(COMMENT_DELETE+'/'+this.props.id, options);
    fetch(r).then(resp => {
      if(resp.status == COMMENT_DELETE_DONE_STATUS) {
        this.props.onCommentDelete(true);
      }
    }, (err) => {
      this.props.onCommentDelete(false);
    });

  }


  renderDeleteLink() {
   const {isAuth, role, id} = this.context;
   if(role === config.ADMIN_ROLE_NAME || this.props.userObj.id === id) {
     return(<a href="#" className="text-danger" style={{fontSize:'0.8em',}} onClick={(e)=>this.handleDelete(e)}>Delete this comment</a>)
   } else { return(null); }
 }


}

Comment.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  content: PropTypes.string,
  userObj: PropTypes.object,
  onCommentDelete: PropTypes.func
}

export default Comment;
