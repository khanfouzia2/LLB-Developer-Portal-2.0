import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { COMMENT_POST } from '../../rest-endpoints.js';
import Modal from '../Misc/Modal.js';
import ContentPreview from '../Misc/ContentPreview.js';
import * as config from '../../config.js'
import '../../styles.css'
const helpers = require('../../helpers.js');
var sanitizeHtml = require('sanitize-html');

/*

  Component for commenting threads.
  Props:
    - thread_id : id of the Thread this comment is related to

*/
class CommentCompose extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comment_content: "",
      modal: {
        isShown: false,
      }
    }

    this.handleCommentButtonClick = this.handleCommentButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }



  render() {

    return(
      <React.Fragment>
        <label for="comment_content">Comment</label>
        <textarea onChange={(e) => this.handleInputChange(e)} name="comment_content" value={this.state.comment_content} className="form-control"
          style={{minHeight:'3.0em',maxHeight:'40em',}} maxlength={config.THREAD_COMMENT_MANXLEN}>
        </textarea>
          <div style={{display:'block',}}>
            <span style={{float:'left'}} className="metatext" >Allowed tags: b, a [href, target], code, pre, br. Remember to use http://</span>
            <span style={{float:'right',}} className="metatext" > {this.state.comment_content.length}/{config.THREAD_COMMENT_MANXLEN} </span>
            <div style={{clear:'both',}}></div>
          </div>
        <div className="mt-1">
          <button onClick={(e)=>this.handleCommentButtonClick(e)} className="btn btn-primary btn-sm float-right" role="button" type="button">Comment</button>
        </div>

        {/* Comment preview : Can't be <textarea> */}
        { this.state.comment_content.length >= 3 &&
          <ContentPreview content={this.state.comment_content} />
        }

        {/*  */}
        <Modal isShown={this.state.modal.isShown}
          onCloseFunction={(e)=>this.setState({modal: {isShown: false}})}
          title={this.state.modal.title} content={null}
          closeButtonStyle={this.state.modal.closeButtonStyle}/>
      </React.Fragment>
    );

  }

  componentWillReceiveProps(newProps) {
    // ...
  }



  handleCommentButtonClick(e) {
    console.log("User clicked 'comment' button!");

    // disable button for a moment
    e.target.disabled = true;
    setInterval( function(button) { button.disabled=false; }, 5000, e.target);

    var heds = new Headers();
    heds.append("Content-type", "application/json")

    const options = {
      method: "POST",
      headers: heds,
      credentials:"include",
      body: JSON.stringify({
        thread_id: this.props.thread_id,
        content: this.state.comment_content
      })
    }

    // Make a request object
    var r = new Request(COMMENT_POST, options);

    // Call back end
    fetch(r).then(res => {

      console.log( res.ok )
      if(res.ok) {
        return res.json();
      } else { throw new Error("Comment was not saved! ") }

    }).then(data => {
      // Open Modal window. Show success message
      //this.setState({modal: { isShown: true, title:"Commented", closeButtonStyle:"success", }});

      // Call function that was passed as props from parent
      //this.props.afterSuccesfullCommenting(data);

      // Quick and dirty way to update UI
      window.location.reload();

    }).catch(err => {
      // Open Modal window. Show success message
      console.log(err);
      this.setState({modal: { isShown: true, title:err.toString(), closeButtonStyle:"warning", }});
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

Comment.propTypes = {
  thread_id: PropTypes.number,
}

export default CommentCompose;
