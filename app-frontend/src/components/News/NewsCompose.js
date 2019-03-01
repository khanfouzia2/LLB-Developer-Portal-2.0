import React, {Component} from 'react';

class NewsCompose extends Component {


  constructor(props) {
    super(props);
    this.state = {

      title: null,
      content: null,
      author_id: null,
      attachment_file: null,
      is_visible: null,
      previewSrc: "<>"

    }
    this.attachment_file = React.createRef();
    this.imgPreview = React.createRef();


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleAttachmentFileInputChange = this.handleAttachmentFileInputChange.bind(this);
  }


  render() {
    return(
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <h3>News - Compose</h3>
          </div>
          <div className="card-body">

            <form>
              {/* Title */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Title</label>
                </div>
                <div className="col-md-9">
                  <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleInputChange} maxlength="100" className="form-control" />
                  <span>Required. Max 100 chars.</span>
                </div>
              </div>

              {/* Content */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Content</label>
                </div>
                <div className="col-md-9">
                  <textarea rows="5" name="content" value={this.state.content} onChange={this.handleInputChange} className="form-control"></textarea>
                  <span>Required. Max 10 000 chars</span>
                </div>
              </div>

              {/* Attachment */}
              <div className="form-group row">
                <div className="col-md-3">
                  <label for="" class="col-form-label">Header Image</label>
                </div>
                <div className="col-md-9">
                  <input type="FILE" name="file" ref={this.attachment_file} onChange={this.handleAttachmentFileInputChange} className="form-control-file" />
                  <label for="">Max filesize 20 MB. Allowed file formats: <code>.png, .jpeg, .gif</code></label>
                  <img className="img img-thumbnail img-fluid" src={this.state.previewSrc} ref={this.imgPreview} />
                </div>
              </div>
              <div className="form-group">

              </div>
            </form>

          </div>
          <div className="card-footer">
            <div className="row">

              <div className="col-md-3">
                <a href="#">Delete this post</a>
              </div>
              <div className="col-md-3">
              </div>
              <div className="col-md-3">
                <input type="button" value="Save as draft" className="btn btn-outline-success btn-sm" />
                <input type="button" value="Publish" onClick={this.handlePublish} className="btn btn-success btn-sm" />
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
    const req = new Request('http://localhost:1234', {method: 'POST', body: '{"foo": "bar"}'});
    fetch(req).then(res => {

      console.log(res);

    }).then(err => {
      console.log(err);
    })

  }

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

    console.log(file_);


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
      title: "Title",
      content: "Content",
      author_id: 1,
      is_visible: true,
    })
  }




}
export default NewsCompose;
