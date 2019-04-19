import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import DefaultUserAvatar from '../NavBar/DefaultUserAvatar';
import './EditProfile.css';
import { UpdateInfo } from '../../services/UserApi';

class EditProfile extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      newPassword: "",
      confirmPassword: "",
      contextAPIrendered: false,
      showMessage: false,
      message: "",
      messageType: "",
    }
    this.renderEditProfile = this.renderEditProfile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    if (this.context !== null) {
      this.setState({
        first_name: this.context.first_name,
        last_name: this.context.last_name,
        email: this.context.email
      })
    }
  }

  renderMessage = () => {
    const {showMessage, message, messageType} = this.state;
    let class_name = "";
    switch(messageType){
      case "success":
        class_name = "alert alert-success";
        break;
      case "error":
        class_name = "alert alert-danger"
        break;
      default:
        class_name = "alert alert-success"
        break;
    }
    if(showMessage) {
      return (
        <div className={class_name} role="alert">
          {message}
        </div>
      );
    }
    else return (<></>);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.isTrusted) return;

    if(this.state.newPassword !== "" && this.state.newPassword !== this.state.confirmPassword) {
       this.setState({showMessage: true, message: "Confirm password does not match", messageType: "error"});
       return;
    }
    try{
      const {updateAuthInfo} = this.context;
      const result = await UpdateInfo(this.state.first_name, this.state.last_name, this.state.newPassword);
      const {first_name, last_name, email, role, id} = result.data;
      updateAuthInfo(true, first_name, last_name, email, role, id);
      this.setState({showMessage: true, messageType: "success" , message: "Update info successful"});
    }
    catch(ex) {
      console.log(`Something wrong when update user info, err = ${ex}`);
      this.setState({showMessage: true, messageType: "error" ,message: "Something went wrong when updating info"});
    }
    
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.context.first_name !== "" && this.state.contextAPIrendered === false) {
      this.setState({
        first_name: this.context.first_name,
        last_name: this.context.last_name,
        email: this.context.email,
        contextAPIrendered: true,
      })
    }
  }

  renderEditProfile = () => {
    const { email, first_name, last_name } = this.state;

    return (
      <>
        <nav className="App-custom-nav">
          <span className="navbar-brand mb-0 h1">EDIT PROFILE</span>
        </nav>
        <div className="App-custom-page-content">
          <div className="card">
            <div className="edit-wrapper">
              <div className="row">
                <div className="col-md-2">
                  <DefaultUserAvatar FirstName={first_name} LastName={last_name}></DefaultUserAvatar>
                  <h5 className="text-center">{`${first_name} ${last_name}`}</h5>
                </div>
                <div className="col-md-7 edit-right-content">
                  {this.renderMessage()}
                  <form onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" placeholder="E-mail" name="email" type="text" onChange={this.handleChange} value={email} disabled/>
                    </div>
                    <div className="form-group">
                      <label>First Name</label>
                      <input className="form-control" placeholder="First Name" name="first_name" type="text" onChange={this.handleChange} value={first_name} autoComplete="something" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-control" placeholder="Last Name" name="last_name" type="text" onChange={this.handleChange} value={last_name} autoComplete="something"/>
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input className="form-control" placeholder="Password" name="newPassword" type="password" onChange={this.handleChange} autoComplete="something"/>
                      <small className="form-text text-muted">Enter new password if you want to change the password !</small>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input className="form-control" placeholder="Password" name="confirmPassword" type="password" onChange={this.handleChange} autoComplete="something"/>
                    </div>
                    <button type="submit" className="btn btn-md btn-primary float-right" >SAVE</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {

    return (
      <>
        {this.renderEditProfile()}
      </>
    );
  }
}
export default EditProfile;