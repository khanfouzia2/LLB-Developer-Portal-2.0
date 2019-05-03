import React, { Component } from 'react'
import AuthContext from '../../context/auth-context';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './EditAppForm.css'
import { PostUserMobileApp } from '../../services/MobileAppApi';
import Alert from '../Misc/Alert';

class EditAppForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.state = {
      applicationName: "",
      applicationDescription: "",
      titleType: "small",
      uploadFileName: "Choose a file",
      permissions: [],
      selectedFile: null,
      isShowAlert: false,
      alertStyle: "",
      alertContent: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.renderTitleTypeOptions = this.renderTitleTypeOptions.bind(this);
    this.renderPermissionCheckBox = this.renderPermissionCheckBox.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.onFileUploadChange = this.onFileUploadChange.bind(this);
    this.handButtonClicked = this.handButtonClicked.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }
  formValidation = () => {
    let error = "";
    if (this.state.applicationName === "") error = "Please enter the application name";
    if (this.state.applicationDescription === "") error = "Please enter the application description";
    if (this.state.permissions.length <= 0) error = "Please choose some permissions";
    if (this.state.uploadFileName === "Choose a file") error = "Please choose the file to upload";

    if (error !== "") {
      this.setState({ isShowAlert: true, alertContent: error, alertStyle: "danger" });
      return false;
    }
    return true;
  }

  handButtonClicked = async (e) => {
    e.preventDefault();
    let isFormValid = this.formValidation();
    if (!isFormValid) return;

    try {
      const status = (e.target.name === "publishButton") ? "testing" : "pending";
      const { applicationName, applicationDescription, titleType, permissions, selectedFile, uploadFileName } = this.state
      const result = await PostUserMobileApp(applicationName, applicationDescription, titleType, permissions, status, uploadFileName, selectedFile);
      if (result.status === 201) {
        this.setState({ isShowAlert: true, alertContent: "Application created successful!", alertStyle: "success" });
      }
      if (result.status === 200) {
        this.setState({ isShowAlert: true, alertContent: "Application update successful!", alertStyle: "success" });
      }
    }
    catch (e) {
      this.setState({ isShowAlert: true, alertContent: "Something went wrong !", alertStyle: "danger" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  hanldeTitleTypeChange = (value) => {
    this.setState({ titleType: value });
  }
  handlePermissionChange = (permission) => {
    let newPermissionArray = this.state.permissions;

    (newPermissionArray.includes(permission))
      ? newPermissionArray = newPermissionArray.filter(x => x !== permission)
      : newPermissionArray.push(permission);

    this.setState({ permissions: newPermissionArray });
  }
  onFileUploadChange = (event) => {
    let file = event.target.files[0];
    if (file.type !== 'application/zip') {
      this.setState({ isShowAlert: true, alertContent: "Only .zip file is supported !", alertStyle: "danger" });
      return;
    }
    this.setState({
      selectedFile: event.target.files[0],
      uploadFileName: (event.target.files.length > 0) ? event.target.files[0].name : this.state.uploadFileName
    });
  }

  renderTitleTypeOptions = () => {
    const titleTypeList = ["small", "medium", "large"]
    const items = titleTypeList.map(x =>
      (
        <RadioButton value={x} rootColor="gray" >
          {x.toUpperCase()}
        </RadioButton>
      ));
    return (
      <RadioGroup onChange={this.hanldeTitleTypeChange} children={items}></RadioGroup>
    );
  }

  renderPermissionCheckBox = () => {
    const permissionList = ["location", "notification", "context"]
    return permissionList.map(x => (
      <div className="form-check permission-form" key={x} onClick={() => this.handlePermissionChange(x)} name={x}>
        <input className="form-check-input" readOnly type="checkbox" checked={this.state.permissions.includes(x)} />
        <label className="form-check-label"  >
          {x.toUpperCase()}
        </label>
      </div>
    ));
  }
  renderFormContent = () => {
    const { isAuth } = this.context;
    const { alertContent, alertStyle, isShowAlert } = this.state;

    if (!isAuth) { return (<></>); }
    else {
      return (
        <>
          <nav className="App-custom-nav">
            <span className="navbar-brand mb-0 h1">CREATE NEW APP</span>
          </nav>
          <div className="App-custom-page-content">
            <div className="row">
              <div className="col-md-9 offset-md-1">
                <div className="card">
                  <div className="edit-wrapper">
                    <Alert style={alertStyle} isShown={isShowAlert} content={alertContent} />
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" placeholder="Application name"
                          name="applicationName" type="text" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Application Description"
                          name="applicationDescription" type="text" onChange={this.handleChange} />
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Title Type</label>
                            {this.renderTitleTypeOptions()}
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Permission</label>
                            {this.renderPermissionCheckBox()}
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label><i className="fas fa-upload"></i> Upload your application code </label>
                            <div className="custom-file">
                              <input type="file" name="appZipFile" className="custom-file-input" id="customFile" onChange={this.onFileUploadChange} />
                              <label className="custom-file-label" htmlFor="customFile">{this.state.uploadFileName}</label>
                              <small className="form-text text-muted">Only support .zip file !</small>
                            </div>
                          </div>
                        </div>
                        <div className="col"></div>
                      </div>

                      <div className="alert alert-secondary">
                        <ul>
                          <li>Publish for Testing - Your app will be available for download on the LLB Landing Page. However, the app will only appear to users who have enabled Testing Mode.</li>
                          <li>Submit for Approval - Your app will be submitted to Adminstrators to check and review. It will appear on the normal list of applications for users to add to their Landing Page. You cannot edit your application once it has been submitted. </li>
                        </ul>
                      </div>
                      <button type="submit" name="submitButton" className="btn btn-md btn-primary float-right btn-app-submit" onClick={this.handButtonClicked}>SUBMIT FOR APPROVAL</button>
                      <button type="submit" name="publishButton" className="btn btn-md btn-secondary float-right" onClick={this.handButtonClicked}>PUBLISH FOR TESTING</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderFormContent()}
      </>
    );
  }
}

export default EditAppForm;