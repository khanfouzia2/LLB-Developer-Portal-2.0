import React, { Component } from 'react'
import AuthContext from '../../context/auth-context';

class EditAppForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.state = {
      applicationName: "",
      description: "",
      titleType: "",
      permission: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderFormContent = this.renderFormContent.bind(this);
    this.renderTitleTypeOptions = this.renderTitleTypeOptions.bind(this);
    this.renderPermissionCheckBox = this.renderPermissionCheckBox.bind(this);
  }
  handleChange = () => { }

  renderTitleTypeOptions = () => {
    const titleTypeList = ["small", "medium", "large"]
    return titleTypeList.map(x =>
      (
        <div className="form-check">
          <input className="form-check-input" type="radio" name="titleType"
            id={`title${titleTypeList.indexOf(x)}`} value={x} />
          <label className="form-check-label" for={`title${titleTypeList.indexOf(x)}`}>
            {x}
          </label>
        </div>
      ));
  }

  renderPermissionCheckBox = () => {
    const permissionList = ["location", "notification", "context"]
    return permissionList.map(x => (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="" id="gridCheck1" />
        <label className="form-check-label" for="gridCheck1">
          {x}
        </label>
      </div>
    ));
  }

  renderFormContent = () => {
    const { isAuth } = this.context;
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
                      <label className="btn btn-default">
                        Browse <input type="file" hidden />
                      </label>
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