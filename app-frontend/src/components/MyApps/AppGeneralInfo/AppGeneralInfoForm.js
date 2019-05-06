import React, { Component } from 'react'
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './EditAppForm.css'
import PropTypes from 'prop-types';

class EditAppForm extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.renderTitleTypeOptions = this.renderTitleTypeOptions.bind(this);
    this.renderPermissionCheckBox = this.renderPermissionCheckBox.bind(this);
    this.handlePermissionChange = this.handlePermissionChange.bind(this);
    this.onFileUploadChange = this.onFileUploadChange.bind(this);
  }

  handleChange = (event) => {
    this.props.onInputChange({[event.target.name]: event.target.value});
  }

  hanldeTitleTypeChange = (value) => {
    this.props.onInputChange({ titleType: value });
  }
  handlePermissionChange = (permission) => {
    let newPermissionArray = this.props.permissions;

    (newPermissionArray.includes(permission))
      ? newPermissionArray = newPermissionArray.filter(x => x !== permission)
      : newPermissionArray.push(permission);

    this.props.onInputChange({ permissions: newPermissionArray });
  }

  onFileUploadChange = (event) => {
    let file = event.target.files[0];
    if (file.type !== 'application/zip') {
      this.props.onInputChange({ isShowAlert: true, alertContent: "Only .zip file is supported !", alertStyle: "danger" });
      return;
    }
    this.props.onInputChange({
      selectedFile: event.target.files[0],
      uploadFileName: (event.target.files.length > 0) ? event.target.files[0].name : this.props.uploadFileName
    })
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
    const { permissions } = this.props;
    const permissionList = ["location", "notification", "context"]
    return permissionList.map(x => (
      <div className="form-check permission-form" key={x} onClick={() => this.handlePermissionChange(x)} name={x}>
        <input className="form-check-input" readOnly type="checkbox" checked={permissions.includes(x)}/>
        <label className="form-check-label"  >
          {x.toUpperCase()}
        </label>
      </div>
    ));
  }
  renderFormContent = () => {
    const { applicationName, applicationDescription, uploadFileName } = this.props;
    return (
      <>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" placeholder="Application name"
              name="applicationName" type="text" onChange={this.handleChange} value={applicationName} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" placeholder="Application Description"
              name="applicationDescription" value={applicationDescription} type="text" onChange={this.handleChange} />
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
                  <label className="custom-file-label" htmlFor="customFile">{uploadFileName}</label>
                  <small className="form-text text-muted">Only support .zip file !</small>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderFormContent()}
      </>
    );
  }
}

EditAppForm.propTypes = {
  applicationName: PropTypes.string,
  applicationDescription: PropTypes.string,
  titleType: PropTypes.string,
  uploadFileName: PropTypes.string,
  permissions: PropTypes.array,
};

export default EditAppForm;