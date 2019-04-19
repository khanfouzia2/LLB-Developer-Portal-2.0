import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { NEWS_POST, NEWS_GET_ONE, NEWS_PATCH, NEWS_DELETE, NEWS_GET_DRAFTS } from '../../rest-endpoints.js';
import PropTypes from 'prop-types';
import ContentPreview from '../Misc/ContentPreview.js';
import NewsDraftsList from './NewsDraftsList.js';
import Modal from '../Misc/Modal.js';
import Alert from '../Misc/Alert.js';
import  * as config from '../../config.js';
const qs = require('query-string');
const helpers = require('../../helpers');

/*

  Component for creating News or editing existing News.

*/

class NewsCompose extends Component {


  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      content: "",
      author_id: null,
      attachment_file: null,
      is_visible: false,
      previewSrc: null,
      edit_mode: false, // edit mode or composing new News?
      alert: {
        isShown: false,
        content: "AAA"
      },
      drafts: [] // Array of news objects
    }
    this.attachment_file    = React.createRef();
    this.imgPreview         = React.createRef();


    this.handleInputChange                  = this.handleInputChange.bind(this);
    this.handleInputIsVisibleChange         = this.handleInputIsVisibleChange.bind(this);
    this.handlePublish                      = this.handlePublish.bind(this);
    this.handleAttachmentFileInputChange    = this.handleAttachmentFileInputChange.bind(this);
    this.handleOnClickDelete                = this.handleOnClickDelete.bind(this);
    this.loadAndUpdateComponentContent      = this.loadAndUpdateComponentContent.bind(this);
  }


  render() {

    const isPreview = this.state.previewSrc;
    const isVisible = this.state.is_visible;

    return(
      <div className="row mt-md-5 App-custom-page-content">
        <div className="col-md-9">


          <div className="card">
            <div className="card-header">
              <h3 clasName="">News - { this.state.edit_mode ? "Edit" : "Compose" }</h3>
            </div>
            <div className="card-body">

              { this.showEditModeAlert() }
              <Alert isShown={this.state.alert.isShown} content={this.state.alert.content} style={this.state.alert.style} key="999" />

              <form>

                {/* Title */}
                <div className="form-group row">
                  <div className="col-lg-3 col-sm-12">
                    <label for="" className="col-form-label">Title</label>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <input type="text" name="title" value={this.state.title} placeholder="Title" onChange={(event)=>this.handleInputChange(event)} maxlength="100"
                    className="form-control" required autocomplete="off" autofocus="autofocus" />
                    <span className="metatext" style={{float:"right"}}>{this.state.title.length}/{config.NEWS_TITLE_MAXLEN} chars</span>
                  </div>
                </div>

                {/* Content */}
                <div className="form-group row">
                  <div className="col-md-3">
                    <label for="content" class="col-form-label">Content</label>
                  </div>
                  <div className="col-md-9">
                     <textarea rows="8" name="content" value={this.state.content} onChange={(e)=>this.handleInputChange(e)}
                     placeholder="..." className="form-control" maxlength={config.NEWS_CONTENT_MAXLEN} style={{minHeight:'10em',}} required></textarea>
                     <span className="more-info metatext" title={config.TEXT_FORMAT_HELP_TEXT}>Formatting help</span>

                    <span className="metatext" style={{float:"right"}}>{this.state.content.length}/{config.NEWS_CONTENT_MAXLEN}</span>
                  </div>
                </div>

                {/* Is visible */}
                <div className="form-group row">

                  <div className="col-md-3">
                    <label className="form-check-label">Is public</label>
                  </div>

                  <div className="col-md-9">
                    <select name="is_visible" className="form-control" value={this.state.is_visible} onChange={(e)=>this.handleInputIsVisibleChange(e)}>
                      <option value="true" selected={this.state.is_visible ? "true" : "false"}>YES</option>
                      <option value="false" selected={!this.state.is_visible ? "true" : "false"}>NO</option>
                    </select>
                    { !this.state.is_visible ? <span className="metatext float-right">Will be saved as a draft</span> : null }
                  </div>

                </div>

                {/* Attachment
                <hr/>
                <div className="form-group row">
                  <div className="col-md-3">
                    <label for="" class="col-form-label">Header Image</label>
                  </div>
                  <div className="col-md-9">
                    <input type="FILE" name="file" ref={this.attachment_file} onChange={this.handleAttachmentFileInputChange} className="form-control-file" />
                    <label for="" className="small">Max file size 20 MB. Allowed file formats: <code>.png, .jpeg, .gif</code></label>

                    {/* Preview
                    {isPreview ? (
                      <img className="img img-thumbnail img-fluid" src={this.state.previewSrc} ref={this.imgPreview} />
                    ) : (
                      null
                    )}
                  </div>
                </div>
                */}
              </form>

            </div>
            <div className="card-footer">
              <div className="row">

                <div className="col-md-6">
                  { this.showDeleteOrDiscardButton() }

                </div>
                <div className="col-md-6 ">
                  <input type="submit" value={ !this.state.edit_mode ? ((this.state.is_visible) ? "Publish" : "Save as draft") : "Update" }
                    onClick={this.handlePublish} className="float-md-right btn btn-success btn-sm"
                    disabled={ (helpers.isStringEmpty(this.state.title) || helpers.isStringEmpty(this.state.content)) ? "disabled" : null }
                  />
                </div>
              </div>

            </div>
          </div>

          {/*  */}
          { this.state.content.length >= 5 &&
            <div className="card mt-3">
              <div className="card-header">Preview</div>
              <div className="card-body">
                <ContentPreview content={this.state.content} />
              </div>
            </div>
          }

        </div>{/* col */}

        <div className="col-md-3">
          <NewsDraftsList drafts={this.state.drafts} />
        </div>

      </div>
    );
  }


  showEditModeAlert() {
    if(this.state.edit_mode) {
      return(<div className="alert alert-info">You are now in edit mode</div>);
    }
  }


  /* Show News id if in edit mode */
  showNewsId() {
    if(this.state.edit_mode) {
      return(
        <React.Fragment>
           <code>#ID: {this.state.id}</code>
        </React.Fragment>
      )
    }
  }

  /* Returns 'Delete' or 'Discard' button based on edit_mode
    TODO: add Click handlers!
  */
  showDeleteOrDiscardButton() {
    if(this.state.edit_mode) {
      // Show 'Discard' button
      return(
        <React.Fragment>
          <Link to="/news/page/1"><input type="submit" value="Discard changes" className=" btn btn-danger btn-sm mr-md-3" /></Link>
          <input type="submit" value="Delete" onClick={(e)=>this.handleOnClickDelete(e)} className="btn btn-danger btn-sm" />
        </React.Fragment>
      )
    } else {
      // Show Delete button
      return(
        <Link to="/news/page/1"><input type="submit" value="Cancel"  className="btn btn-danger btn-sm" /></Link>
      )
    }
  }




  handlePublish(e) {
    console.log("Users pressed Publish/Save News -button");

    // First, check fields
    if(helpers.isStringEmpty(this.state.title) || helpers.isStringEmpty(this.state.content)) {
      this.setState({ alert: {isShown: true, content: "Please fill the required fields!", style: "info"} });
      return false;
    }
    //

    // Content ok, prepare for sending request to back end.
    // Disable button for a moment
    e.target.disabled = true;
    setInterval( function(button) { button.disabled=false; }, 4000, e.target);

    const data = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
      is_visible: this.state.is_visible,
      //attachment_file: this.attachment_file.files[0]
    };

    var url;
    var headers = new Headers();
    var body = JSON.stringify(data)
    console.log(body)

    if(this.state.edit_mode) {
      // PATCH existing
      console.log("PATCH")
      headers.append("Content-type", "application/json")

      var init = {
        method: "PATCH",
        headers: headers,
        credentials: "include",
        body: body
      }
      var req = new Request(NEWS_PATCH+'/'+this.state.id, init);

    }
    else {
      // POST new
      console.log("POST")
      headers.append("Content-Type", "application/json")
      var init = {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: body
      }

      var req = new Request(NEWS_POST, init);
    }


    fetch(req).then(res => {
      //alert(res.status);
      console.log(res);

      // If response was not OK
      if(res.ok) {
        return res.json();
      } else {
        console.log("NOT OK")
        // Resolve error
        res.json().then( (err) => {
          this.setState({
            alert: {isShown: true, content: err.message, style: "danger"}
          });
        });
        return Promise.reject();
      }


    },
    // Fetch failed.
    (err) => {
      this.setState({
        alert: {isShown: true, content: "An error occured", style: "danger"}
      });
      return Promise.reject();
    }).then(data => {

      // Make alert visible
      console.log(data)
      this.setState({
        alert: {isShown: true, content: data.message, style: "success"}
      })

    });


  }



  /*
    Get file from upload-form. Start reading its content (dataURL)
    with FileReader. After done, event "loadend" will trigger.
    update dataULR to preview-el's src-attr.

    NOT USED
  */
  handleAttachmentFileInputChange(event) {

    var file_ = event.target.files[0];
    var reader = new FileReader();
    console.log("#" + file_.src);

    // Only process image files.
    if (!file_.type.match('image.*')) {
      alert("File format not allowed!");
      return;
    }

    // Start reading. Async.
    reader.readAsDataURL(file_)

    // When ready, do this.
    // Sets images element's src to the file's content
    // reader.result contains the valid content
    reader.addEventListener("loadend", () => {
      this.setState({previewSrc: reader.result});
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

  /* Method for handling Select-elment */
  handleInputIsVisibleChange(e) {
    var val = e.target.value;
    if(val === "true") {
      this.setState({is_visible: true});
    }
    if(val === "false") {
      this.setState({is_visible: false});
    }
  }



  componentWillReceiveProps(newProps) {
    var parsed = qs.parse(newProps.location.search);
    var id = parsed.edit_id; // id is checked in helper method. NOTE: id string at this point!

    if(helpers.isValidID(id)) {
      this.loadAndUpdateComponentContent(id);
    }
  }

  /*
    Delete button was pressed
  */
  handleOnClickDelete(event) {

    console.log("DELETE button handler function triggered...");
    const news_id = this.state.id;
    if(!news_id) { return; }

    var req = new Request(NEWS_DELETE+'/'+news_id, {
      method: 'DELETE',
      headers: {
      },
      credentials: 'include',
      body: JSON.stringify(null)
    });

    // Make a HTTP call
    fetch(req).then(data => {
      return data.json()
    }).then(data => {
      console.log( data.message );
    }).catch(err => {
      //alert(err);
    })

  }


  loadAndUpdateComponentContent(news_id) {

    console.log(news_id)
    if(helpers.isValidID(news_id)) {

      fetch(new Request(NEWS_GET_ONE+'/'+news_id)).then(data => {
        return data.json();
      }).then(data => {
        console.log(data);

        // Set state
        this.setState({
          id: data.id,
          title: data.title,
          content: data.content,
          is_visible: data.is_visible,
          edit_mode: true
        });

      }).catch(err => {
        console.log(err);
      })

    }
    else {
      // do nothing special

    }
  }

  /*
    Load News object. If ID is valid, enter EDIT-mode

    TODO: Redirect to error page
  */

  componentWillMount() {
    var parsed = qs.parse(this.props.location.search);
    var id = parseInt(parsed.edit_id, 10); // base 10 integer
    this.loadAndUpdateComponentContent(id);
    this.loadDraftsAndUpdateState()
  }


  /*
    Retrieve Drafts from back-end and save to state.drafts.
    state.drafts is array of news objects [News, ...]
  */
  loadDraftsAndUpdateState() {
    var req = new Request(NEWS_GET_DRAFTS, {
      method: "GET",
      credentials: "include"
    });

    console.log("Fetching drafts from back end...");
    fetch(req).then(data => {
      return data.json()
    }).then(data => {
      this.setState({
        drafts: data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }



}

export default NewsCompose;
