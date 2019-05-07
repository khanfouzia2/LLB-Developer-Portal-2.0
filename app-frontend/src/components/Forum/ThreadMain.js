import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth-context';
import Modal from '../Misc/Modal.js';
import Comment from './Comment.js';
import CommentCompose from './CommentCompose.js';
import { Link } from "react-router-dom"
import { GET_THREAD } from '../../rest-endpoints.js';
import * as config from '../../config.js';
const helpers = require('../../helpers.js');
var sanitizeHtml = require('sanitize-html');

class ThreadMain extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      threadObj: {
        title: "",
        content: "",
        comments: []
      },
      modal: {
        isShown: false,
      }
    }

    // Events:
    this.afterSuccesfullCommenting    = this.afterSuccesfullCommenting.bind(this);
    this.onCommentDelete              = this.onCommentDelete.bind(this);
    this.renderEditedNotification     = this.renderEditedNotification.bind(this);
  }

  render() {


    const numComments = this.state.threadObj.comments.length;
    const meta = { color:'#ccc', fontSize:'0.8em', }
    // TODO error handling for empty objects/lists

    return(
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Thread</h2>
        </div>

        <div className="App-custom-page-content">
          <h3>{ this.state.threadObj.title }</h3>
          <span className="metatext">{helpers.getDateFormatted(this.state.threadObj.created_at)}</span>

          <div className="thread-mainpost-content" dangerouslySetInnerHTML={helpers.getSanitizedContent(this.state.threadObj.content)}></div>

          {/* Edit link for admin & owner */}
          { this.getEditLink() }

          <hr className="mt-5"/>

          {/* Comments */}
          <div className="" id="comments">
            <span id="comment-count" className="metatext">{numComments} {helpers.getNumericBending(numComments, "comment", "comments")} - oldest first</span>
            { this.renderEditedNotification() }
            { this.state.threadObj.comments.map((comment, i) => {
                return(<Comment id={comment.id} content={comment.content} userObj={comment.user} created_at={comment.created_at} key={comment.id} index={i} onCommentDelete={this.onCommentDelete}/>);
            }) }
          </div>

          {/* Write a comment */}
          <div className="mt-3">
            <CommentCompose thread_id={this.state.threadObj.id} afterSuccesfullCommenting={this.afterSuccesfullCommenting}/>
          </div>

          {/* Modal window lurking here. Not visible by default */}
          <Modal onCloseFunction={()=>this.setState({modal:{isShown:false}})} closeButtonStyle={this.state.modal.closeButtonStyle} isShown={this.state.modal.isShown} title={this.state.modal.title} content={this.state.modal.content} />

        </div>

        {/* some empty space */}
        <div className="mb-5"></div>

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
      helpers.redirectUser('/forum');
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
      throw new Error("Component couldn't mount! Error in code or invalid ID");
      console.log(err)
    })

    console.log("Did mount. Fetch Thread data from server... ID " + id)
  }



  getEditLink() {

    const { id, role } = this.context; // Get auth. user data
    if(id === this.state.threadObj.author_id || role === config.ADMIN_ROLE_NAME) {
      return(<Link to={`/forum/thread/${this.state.threadObj.id}/edit`}>Edit</Link>)
    } else { return(null); }
  }


  /* If thread has been edited, show an alert */
  renderEditedNotification() {
    const th = this.state.threadObj;
    if(th.created_at < th.updated_at) {
      return( <span className="metatext float-right">This thread has been edited after it was first published. Last edited: {helpers.getDateFormatted(th.updated_at)}</span> );
    } else { return(null); }
  }


  /* Pass this function to Comment. This function is called after server resp. is received */
  onCommentDelete(success=false) {
    if(success) {
      //this.setState({ modal: { isShown:true, title:"Comment deleted", closeButtonStyle:"success", content: "Comment deleted and no longer visible to other users." } })
      helpers.redirectUser(""); // reload
    } else {
      this.setState({ modal: { isShown:true, title:"An error occured"} })
    }
  }
  /*
    Updates the UI.
    Pass this function to CommentCompose -component
  */
  afterSuccesfullCommenting(commentObj) {
    // ...
  }


}
export default ThreadMain;
