import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom"
import { FORUM_POST_NEW } from '../../rest-endpoints.js';
import * as config from '../../config.js'
import Modal from '../Misc/Modal.js';
const helpers = require('../../helpers.js');


class ThreadCompose extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      modal: {
        isShown: false
      }


    }


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.onCloseModalFunc = this.onCloseModalFunc.bind(this);
  }


  render() {

    const charCounter = { float:'right' };

    return(
      <React.Fragment>
        <div className="card border-success_ mb-5">
          <div className="card-body">

            <div className="mb-3">
              <h3>New Thread</h3>
            </div>

            <div className="form-group row">
              <div class="col-md-2">
                <label for="title" className="col-form-label">Title</label>
              </div>
              <div class="col-md-10">
                <input className="form-control" name="title" value={this.state.title} onChange={(e)=>this.handleInputChange(e)} type="text" maxlength={config.THREAD_TITLE_MAXLEN} placeholder="Title" required/>
                <span className="metatext" style={charCounter}>{this.state.title ? this.state.title.length : "0"} / { config.THREAD_TITLE_MAXLEN }</span>
              </div>
            </div>{/* end of title row */}

            <div className="form-group row">
              <div class="col-md-12">
                <textarea className="form-control" name="content" onChange={(e)=>this.handleInputChange(e)} style={{minHeight:50, maxHeight:1000}}
                  rows="5" placeholder="Content" maxlength={config.THREAD_CONTENT_MAXLEN} value={this.state.content} required>
                </textarea>
                <span className="metatext" style={charCounter}>{this.state.content ? this.state.content.length : "0"} / { config.THREAD_CONTENT_MAXLEN }</span>
                <span className="metatext" style={{lineHeight:'0.5em', fontSize:'0.7em',}}>
                  Allowed tags are: { config.THREAD_CONTENT_ALLOWED_TAGS.join(", ") }.<br/>
                  NOTE: Allowed iframe hosts: { config.THREAD_CONTENT_ALLOWED_IFRAME_HOSTS.join(", ") }.<br/>
                  Allowed attributes: a [src, target], img [src, height, width]
                </span>
              </div>
            </div>

            {/* Bottom row, buttons */}
            <div className="form-group row mb-0">
              <div class="col-md-12">
                <div className="float-left">
                  <button onClick={(e)=>this.props.onCancelFunction()} className="btn btn-outline-danger btn-sm">Cancel</button>
                </div>
                <div className="float-right">
                  <button type="button" onClick={(e)=>this.handlePost(e)} className="ml-2 btn btn-success btn-sm">Post</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal window hiding here. Not visible by default */}
        <Modal onCloseFunction={this.onCloseModalFunc} isShown={this.state.modal.isShown} title={this.state.modal.title} content={this.state.modal.content} />
      </React.Fragment>
    );
  } // render


  handlePost(e) {
    console.log("onClick Post");

    var hed = new Headers();
    hed.append("Content-type", "application/json")

    const data = {
      title: this.state.title,
      content: this.state.content
    }

    const options = {
      method: "POST",
      credentials: "include",
      headers: hed,
      body: JSON.stringify(data),
    }

    var r = new Request(FORUM_POST_NEW, options);

    fetch(r).then(res => {

      if(res.ok) {
        // Pass data to next function
        return res.json();
      } else {
        throw new Error('Error'); // jumps to catch()
      }

    }).then(data => {
      // Redirect user to thread (s)he created
      console.log("Redirecting to thread id: " + data.id)
      helpers.redirectUser("forum/thread/"+data.id);

    }).catch(err => {
        this.setState({
          modal: { isShown: true, title: "An error occured!", content: "Error", onCloseFunction: this.onCloseModalFunc, closeButtonStyle: "primary" }
        })
        console.log(err)
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

  /* Pass this function to Modal window */
  onCloseModalFunc() {
    this.setState({
      modal: {
        isShown: false
      }
    });
  }

}

ThreadCompose.propTypes = {
  onCancelFunction: PropTypes.func
}

export default ThreadCompose;
