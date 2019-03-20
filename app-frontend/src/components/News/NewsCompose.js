import React, {Component} from 'react';
import { NEWS_POST } from '../../rest-endpoints.js';

class NewsCompose extends Component {


  constructor(props) {
    super(props);
    this.state = {

      title: "",
      content: "",
      author_id: null,
      attachment_file: null,
      is_visible: null,
      previewSrc: null,

    }
    this.attachment_file = React.createRef();
    this.imgPreview = React.createRef();


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleAttachmentFileInputChange = this.handleAttachmentFileInputChange.bind(this);
  }


  render() {

    const isPreview = this.state.previewSrc;
    const isVisible = this.state.is_visible;

    return(
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <span className="far fa-newspaper"></span>
            <h3 clasName="">News - Compose</h3>
          </div>
          <div className="card-body">

            <form>
              {/* Title */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Title</label>
                </div>
                <div className="col-md-9">
                  <input type="text" name="title" value={this.state.title} placeholder="Title" onChange={this.handleInputChange} maxlength="100" className="form-control" required />
                  <span class="badge badge badge-danger">Required</span>
                  <span className="small">{this.state.title.length}/100 chars</span>
                </div>
              </div>

              {/* Content */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Content</label>
                </div>
                <div className="col-md-9">
                  <textarea rows="5" name="content" value={this.state.content} onChange={this.handleInputChange} className="form-control" maxlength="30000" required></textarea>
                  <span class="badge badge badge-danger">Required</span>
                  <span className="small">{this.state.content.length}/30 000</span>
                </div>
              </div>

              {/* Is visible */}
              <div className="form-group row">

                <div className="col-md-3">
                  <label className="form-check-label">Is public?</label>
                </div>

                <div className="col-md-9">
                  <select id="inputState" class="form-control" required>
                    <option selected>Yes (public)</option>
                    <option>No (not public)</option>
                  </select>
                </div>

              </div>

              <hr/>

              {/* Attachment */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Header Image</label>
                </div>
                <div className="col-md-9">
                  <input type="FILE" name="file" ref={this.attachment_file} onChange={this.handleAttachmentFileInputChange} className="form-control-file" />
                  <label for="" className="small">Max file size 20 MB. Allowed file formats: <code>.png, .jpeg, .gif</code></label>

                  {/* Preview */}
                  {isPreview ? (
                    <img className="img img-thumbnail img-fluid" src={this.state.previewSrc} ref={this.imgPreview} />
                  ) : (
                    null
                  )}
                </div>
              </div>
              <div className="form-group">

              </div>
            </form>

          </div>
          <div className="card-footer">
            <div className="row">

              <div className="col-md-3">
                <a href="#" className="small">Delete this post</a>
              </div>
              <div className="col-md-6">
              </div>
              <div className="col-md-3 ">
                <input type="submit" value="Save" onClick={this.handlePublish} className="float-md-right btn btn-success btn-sm" />
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }


  handlePublish(e) {
    console.log("Users pressed Publish News -button");

    /* for sending some mock data to back-end, will be changed */

    const data = {
      title: this.state.title,
      content: this.state.content,
      //attachment_file: this.attachment_file.files[0]
    };

    console.log("Calling "+NEWS_POST);

    const req = new Request(NEWS_POST, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetch(req).then(res => {
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


  componentDidMount() {
    this.setState({
      title: "",
      content: "",
      author_id: -1,
      is_visible: true,
    })
  }




}
export default NewsCompose;
