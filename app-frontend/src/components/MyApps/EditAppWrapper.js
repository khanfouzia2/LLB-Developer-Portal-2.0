import React, { Component } from 'react'
import AuthContext from '../../context/auth-context';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './EditAppForm.css'
import { PostUserMobileApp } from '../../services/MobileAppApi';
import Alert from '../Misc/Alert';
import QuestionairList from './Questionairs/QuestionairList'
import GeneralAppInfoForm from './AppGeneralInfo/AppGeneralInfoForm';

class EditAppWrapper extends Component {
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
      alertContent: "",
      questionairList: [],
    }
    this.handleStateChange = this.handleStateChange.bind(this);
    this.renderFormContent = this.renderFormContent.bind(this);
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
    //console.log(this.state)

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

  handleStateChange = (obj) => {
    this.setState({ ...obj });
  }

  renderFormContent = () => {
    const { isAuth } = this.context;
    const { alertContent, alertStyle, isShowAlert, questionairList} = this.state;

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
                    <form>
                      <Alert style={alertStyle} isShown={isShowAlert} content={alertContent} />
                      <GeneralAppInfoForm 
                        onInputChange={this.handleStateChange}
                        applicationName={this.state.applicationName}
                        applicationDescription = {this.state.applicationDescription}
                        titleType = {this.state.titleType}
                        uploadFileName = {this.state.uploadFileName}
                        permissions = {this.state.permissions} >
                      </GeneralAppInfoForm>
                      <fieldset className="border p-2">
                        <legend className="w-auto">FEEDBACK SETUP <i className="fas fa-comments"></i></legend>
                        <QuestionairList onQuestionairListChange = {this.handleStateChange}
                            questionairList={questionairList}>
                        </QuestionairList>
                      </fieldset>
                      <br/>
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

export default EditAppWrapper;