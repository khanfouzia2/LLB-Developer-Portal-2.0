import React, {Component} from 'react';
import { Link } from "react-router-dom"
import { NEWS_POST, NEWS_GET_ONE, NEWS_PATCH } from '../../rest-endpoints.js';
import { AuthConsumer } from '../../context/authContext';
import  * as config from '../../config.js'
const qs = require('query-string');

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
    }
    this.attachment_file    = React.createRef();
    this.imgPreview         = React.createRef();


    this.handleInputChange                   = this.handleInputChange.bind(this);
    this.handlePublish                              = this.handlePublish.bind(this);
    this.handleAttachmentFileInputChange          = this.handleAttachmentFileInputChange.bind(this);
  }


  render() {

    const isPreview = this.state.previewSrc;
    const isVisible = this.state.is_visible;

    return(
      <React.Fragment>
        <div className="card mt-md-5">
          <div className="card-header">
            <span className="far fa-newspaper"></span>
            <h3 clasName="">News - { this.state.edit_mode ? "Edit" : "Compose" }</h3>
          </div>
          <div className="card-body">

            { this.showEditModeAlert() }
            { this.showNotPublicAlert() }

            <form>

              {/* ID - Cannot be modified */}
              { this.showNewsId() }

              {/* Title */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Title</label>
                </div>
                <div className="col-md-9">
                  <input type="text" name="title" value={this.state.title} placeholder="Title" onChange={(event)=>this.handleInputChange(event)} maxlength="100" className="form-control" required />
                  <span class="badge badge badge-danger">Required</span>
                  <span className="small">{this.state.title.length}/{config.NEWS_TITLE_MAXLEN} chars</span>
                </div>
              </div>

              {/* Content */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Content</label>
                </div>
                <div className="col-md-9">
                  <textarea rows="8" name="content" value={this.state.content} onChange={(event)=>this.handleInputChange(event)} className="form-control" maxlength={config.NEWS_CONTENT_MAXLEN} required></textarea>
                  <span class="badge badge badge-danger">Required</span>
                  <span className="small">{this.state.content.length}/{config.NEWS_CONTENT_MAXLEN}</span>
                </div>
              </div>

              {/* Is visible */}
              <div className="form-group row">

                <div className="col-md-3">
                  <label className="form-check-label">Is public?</label>
                </div>

                <div className="col-md-9">
                  <input type="checkbox" id="inputState" className="" name="is_visible" onChange={(e)=>this.handleInputChange(e)} />
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

              <div className="col-md-3">
                { this.showDeleteOrDiscardButton() }
              </div>
              <div className="col-md-6">
              </div>
              <div className="col-md-3 ">
                <input type="submit" value={ !this.state.edit_mode ? "Save" : "Update" } onClick={this.handlePublish} className="float-md-right btn btn-success btn-sm" />
              </div>
            </div>

          </div>
        </div>

        <h1>Not public News</h1>
        # list here
      </React.Fragment>
    );
  }


  showEditModeAlert() {
    if(this.state.edit_mode) {
      return(<div className="alert alert-info">You are now in edit mode! <Link to="/news/compose"> Make a new announcement instead. </Link></div>);
    }
  }

  /* Show an alert box if News is not public */
  showNotPublicAlert() {
    if(!this.state.is_visible) {
      return(<div className="alert alert-warning"> Will not be visible to public! </div>);
    }
  }

  /* Show News id if in edit mode */
  showNewsId() {
    if(this.state.edit_mode) {
      return(
        <React.Fragment>
          <div className="form-group row">
            <div className="col-md-3">
              <label for="" class="col-form-label"> <code>#ID</code> </label>
            </div>
            <div className="col-md-9">
              <input type="text" name="id" disabled value={this.state.id} placeholder="ID" className="form-control" required />
            </div>
          </div>
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
          <Link to="/news"><input type="submit" value="Discard changes" className=" btn btn-danger btn-sm mr-md-3" /></Link>
          <input type="submit" value="Delete" className="btn btn-danger btn-sm" />
        </React.Fragment>
      )
    } else {
      // Show Delete button
      return(
        <input type="submit" value="Cancel"  className="btn btn-danger btn-sm" />
      )
    }
  }


  handlePublish(e) {
    console.log("Users pressed Publish/Save News -button");

    /* for sending some mock data to back-end, will be changed */

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
      alert(res.status);
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

  }





  /*
    Get file from upload-form. Start reading its content (dataURL)
    with FileReader. After done, event "loadend" will trigger.
    update dataULR to preview-el's src-attr.

    TODO: Error message
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



  componentWillReceiveProps(newProps) {
    var parsed = qs.parse(this.props.location.search);
    if(parsed.id === undefined) {
      this.setState({
        id: 0,
        title: "",
        content: "",
        is_visible: false,
        edit_mode: false
      })
    }
  }


  /*
    Load News object. If ID is valid, enter EDIT-mode

    TODO: Redirect to error page
  */
  componentWillMount(props) {
    var parsed = qs.parse(this.props.location.search);
    var id = parseInt(parsed.edit_id, 10); // base 10 integer
    if(!isNaN(id) && id >= 0) {
      //
      fetch(new Request(NEWS_GET_ONE+'/'+id)).then(data => {
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




}
export default NewsCompose;
