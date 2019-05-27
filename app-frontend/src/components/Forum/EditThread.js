import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { GET_THREAD, THREAD_PATCH, THREAD_DELETE, THREAD_PATCH_DONE_STATUS, THREAD_DELETE_DONE_STATUS } from '../../rest-endpoints.js';
import { editThreadPolicy } from '../../authorization/view-policies.js';
import AuthContext from '../../context/auth-context';
import Modal from '../Misc/Modal.js';
import ConfirmButton from '../Misc/ConfirmButton.js';
import ContentPreview from '../Misc/ContentPreview.js';
import * as config from '../../config.js'
import '../../styles.css'
const helpers = require('../../helpers.js');
var sanitizeHtml = require('sanitize-html');

/*

  View/Component for editing existing Thread (start post)

*/
class EditThread extends React.Component {

  static onErrorRedirectURL = '/forum';
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      thread_id: -1,
      thread_title: "",
      thread_content: "",
      modal: {
        isShown: false,
        title: "",
        content: "",
        closeButtonText: "",
        closeButtonStyle: "",
        extraButtons: []
      }
    }

    this.handleUpdateOnClick  = this.handleUpdateOnClick.bind(this);
    this.handleInputChange    = this.handleInputChange.bind(this);
    this.makeDeleteThreadCall         = this.makeDeleteThreadCall.bind(this);
  }


  render() {


    return(
      <React.Fragment>
        <div className="App-custom-nav">
          <h2>Edit Thread</h2>
        </div>
        <div className="row mt-md-5 App-custom-page-content">

          <div className="container">

            <div className="row">
              <div class="col-12">
                <Link to={`/forum/thread/${this.state.thread_id}/`}>Go back</Link>
                <input type="text" className="form-control" style={{cursor:'not-allowed'}} value={this.state.thread_title} disabled />
                <textarea name="thread_content" style={{minHeight:'10em',maxHeight:'50em',}} className="mt-1 form-control"
                  onChange={(e)=>this.handleInputChange(e)} value={ this.state.thread_content }></textarea>
                <span className="more-info metatext" title={config.TEXT_FORMAT_HELP_TEXT}>Formatting help</span>
                <span className="metatext float-right">{this.state.thread_content.length}/{config.THREAD_CONTENT_MAXLEN}</span>
              </div>
            </div>

            <div className="row mt-3">
              <div class="col-9">
                <button className="btn btn-danger btn-sm" onClick={(e)=>{ this.onClickDeleteThread(e) }}>Delete thread</button>
              </div>
              <div class="col-3 align-self-end">
                <button onClick={(e)=>this.handleUpdateOnClick(e)} className="btn btn-success btn-sm float-right">Update</button>
              </div>
            </div>

            <div className="mt-3">
              <ContentPreview content={this.state.thread_content} />
            </div>

          </div>

        </div>

        <Modal isShown={this.state.modal.isShown}
          title={this.state.modal.title}
          content={this.state.modal.content}
          onCloseFunction={this.state.modal.onCloseFunction}
          extraButtons={this.state.modal.extraButtons}
          closeButtonText={this.state.modal.closeButtonText}
          closeButtonStyle={this.state.modal.closeButtonStyle}
        />

      </React.Fragment>
    );


  }


  /*
    When user clicks 'delete thread': Open modal window for confirmation
  */
  onClickDeleteThread(e) {

    const ebs = [<button className="btn btn-outline-secondary" onClick={(e)=>this.setState({modal:{isShown:false}})}>Cancel</button>,];

    this.setState({
      modal: { isShown: true, title: "Do you really want to delete this thread?", extraButtons: ebs, onCloseFunction: this.makeDeleteThreadCall, closeButtonStyle: "danger", closeButtonText: "DELETE"}
    })

  }



  /*
    Load the Thread from back end.
    Only add content to store.
  */
  componentDidMount() {

    let id = this.props.match.params.id;
    if(!helpers.isValidID(id)) {
      helpers.redirectUser(EditThread.onErrorRedirectURL);
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

      // Check view-policy
      //console.log(this.context);
      //console.log(data);

      if(editThreadPolicy(this.context, data)) {
        console.log("OK permission");
        this.setState({
          thread_id: data.id,
          thread_title: data.title,
          thread_content: data.content
        });
      } else {
        helpers.redirectUser(EditThread.onErrorRedirectURL);
      }

    }).catch(err => {
      console.log(err);
      helpers.redirectUser(EditThread.onErrorRedirectURL);
    })

  }


  handleUpdateOnClick(e) {

    console.log("User clicked update!");

    // Disable btn for a short moment
    e.target.disabled = true;
    setInterval( function(button) { button.disabled=false; }, 5000, e.target);

    // Request
    var heds = new Headers();
    heds.append('Content-Type', 'application/json');

    const body = {
      thread_content: this.state.thread_content
    }

    const options = {
      method: 'PATCH',
      credentials: "include",
      headers: heds,
      body: JSON.stringify(body)
    }
    const req = new Request(THREAD_PATCH+'/'+this.state.thread_id, options);

    // Send to back-end
    fetch(req).then(resp => {
      if(resp.status === THREAD_PATCH_DONE_STATUS) {
        this.setState({
          modal: {
            isShown: true,
            title: "Updated succesfully!",
            content: null,
            onCloseFunction: () => {
              this.setState({modal:{isShown:false}});
            },
          }
        })
      } else if(resp.status) {
        console.log(resp.status);
        throw new Error("An error occured!")
      }
    }).catch(err => {
      this.setState({
        modal: {
          isShown: true,
          title: "Error "+err,
          content: null
        }
      })
    })

  }



  makeDeleteThreadCall(e) {

    // Headers
    var heds = new Headers();
    heds.append('Application-Content', 'application/json');

    // Options
    const options = {
      method: 'DELETE',
      credentials: 'include',
      headers: heds,
    };

    //
    var r = new Request(THREAD_DELETE+'/'+this.state.thread_id, options);

    // Call
    fetch(r).then(res => {
      if(res.status == THREAD_DELETE_DONE_STATUS) {
        helpers.redirectUser('/forum');
      } else {
        return res.json();
      }
    }).then(data => {
      this.setState({modal: {
        isShown: true,
        title: data.message
      }})
    })


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


export default EditThread;
